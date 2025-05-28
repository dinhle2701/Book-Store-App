/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // nhớ import nếu chưa có
import axios from "axios";
import API_PATHS from "../../../constant/apiPath";
import { Table, Container, Button, Form } from 'react-bootstrap';
import { MdAddToPhotos } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateMedicineModal from './CreateMedicineModal/CreateMedicineModal'; // path tùy vào bạn
import UpdateMedicineModal from "./UpdateMedicineModal/UpdateMedicineModal";
import './Medicine.css'

function Medicine() {
    // modal
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedMedicineId, setSelectedMedicineId] = useState(null);
    const handleOpenUpdateModal = (id) => {
        setSelectedMedicineId(id);
        setShowUpdateModal(true);
    };

    const handleMedicineCreated = (newMedicine) => {
        setMedicines(prev => [...prev, newMedicine]); // cập nhật danh sách ngay
        setShowModal(false)
    };

    const handleMedicineUpdated = (updatedMedicine) => {
        setMedicines(prev =>
            prev.map(m => (m.id === updatedMedicine.id ? updatedMedicine : m))
        );
        setShowUpdateModal(false);
    };

    const [medicines, setMedicines] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // New state for search term

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const decoded = jwtDecode(token);
                const userId = decoded?.userId || decoded?.id;

                const response = await axios.get(`${API_PATHS.medicines}/medicines/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("API response:", response.data);

                setMedicines(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicines();
    }, []);

    const [deletingId, setDeletingId] = useState(null);
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this medicine?");
        if (!confirmDelete) return;

        setDeletingId(id);
        try {
            await axios.delete(`${API_PATHS.medicines}/medicines/user/delete/${id}`);
            toast.success("Medicine deleted successfully!");
            setMedicines(prev => prev.filter(m => m.id !== id));
        } catch (error) {
            toast.error("Failed to delete medicine");
            console.error(error.message);
        } finally {
            setDeletingId(null);
        }
    };

    // Filter medicines based on search term
    const filteredMedicines = medicines.filter((item) =>
        item.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) // Case-insensitive search
    );

    return (
        <div className="medicines m-3 p-4">
            <Container className="w-100">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h1 className="mb-4 col-12 col-sm-6">Medicines</h1>
                    <Button
                        className="d-flex align-items-center col-12 col-sm-auto mt-2 mt-sm-0"
                        onClick={handleOpenModal}
                    >
                        <MdAddToPhotos className="me-2" /> Add New
                    </Button>
                </div>

                {/* Search input */}
                <Form.Control
                    type="text"
                    placeholder="Search medicines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                    className="mb-4"
                />

                {/* Table */}
                <div className="table-responsive">
                    <Table hover>
                        <thead>
                            <tr>
                                <th className="bg-light">ID</th>
                                <th className="bg-light">Medicine Name</th>
                                <th className="bg-light">Dosage</th>
                                <th className="bg-light">Frequency</th>
                                <th className="bg-light">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMedicines
                                .filter(item => item && item.medicineName) // tránh undefined/null
                                .map((item, index) => (
                                    <tr key={item.id || index}>
                                        <td className="text-wrap">{index + 1}</td>
                                        <td>{item.medicineName}</td>
                                        <td className="text-wrap">{item.dosage} mg</td>
                                        <td className="nowrap">{item.frequency} times/day</td>
                                        <td>
                                            <div className="d-flex justify-content-center align-items-center gap-2 flex-nowrap">
                                                <Button
                                                    className="d-flex align-items-center flex-nowrap"
                                                    variant="secondary"
                                                    onClick={() => handleOpenUpdateModal(item.id)}
                                                >
                                                    <FaPencilAlt className="me-2" /> Update
                                                </Button>

                                                <Button
                                                    className="d-flex align-items-center flex-nowrap"
                                                    variant="warning"
                                                    onClick={() => handleDelete(item.id)}
                                                    disabled={deletingId === item.id}
                                                >
                                                    <FaDeleteLeft className="me-2" /> Delete
                                                </Button>
                                            </div>
                                        </td>


                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>
            </Container>

            <CreateMedicineModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                onCreated={handleMedicineCreated}
            />

            <UpdateMedicineModal
                show={showUpdateModal}
                handleClose={() => setShowUpdateModal(false)}
                onCreated={handleMedicineUpdated}
                medicineId={selectedMedicineId}
            />
        </div>

    );
}

export default Medicine;
