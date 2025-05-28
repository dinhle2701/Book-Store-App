/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap'
import { jwtDecode } from "jwt-decode"; // nhớ import nếu chưa có
import axios from "axios";
import API_PATHS from "../../../../constant/apiPath";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateMedicineModal = ({ show, handleClose, onCreated, medicineId }) => {
    const [formData, setFormData] = useState({
        medicineName: '',
        dosage: '',
        frequency: ''
    });

    const getUserId = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const decoded = jwtDecode(token);
        return decoded.userId || decoded.sub;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateSubmit = async (e, id) => {
        e.preventDefault();
        const userId = getUserId();
        if (!userId) return alert("User not found in token!");

        try {
            const res = await axios.put(`${API_PATHS.medicines}/medicines/user/${userId}/update/${medicineId}`, {
                ...formData,
                userId
            });

            toast.success('Update Medicine Successful!', {
                position: 'top-right',
                autoClose: 2500
            });
            onCreated(res.data); // reload list
            handleClose(); // không cần truyền true nếu onClose không nhận tham số
        } catch (err) {
            toast.error('Update Medicine Failed!', {
                position: 'top-right',
                autoClose: 2500
            });
        }
    };
    useEffect(() => {
        if (!show) {
            setFormData({
                medicineName: '',
                dosage: '',
                frequency: ''
            });
        }
    }, [show]);



    return (
        <Modal
            show={show}
            onHide={handleClose}
            animation={true}
            onExited={() => {
                setFormData({
                    medicineName: '',
                    dosage: '',
                    frequency: ''
                });
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Update Medicine</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdateSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Medicine Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="medicineName"
                            value={formData.medicineName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Dosage</Form.Label>
                        <Form.Control
                            type="text"
                            name="dosage"
                            value={formData.dosage}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Frequency</Form.Label>
                        <Form.Control
                            type="text"
                            name="frequency"
                            value={formData.frequency}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <div className="text-end">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Cancel
                        </Button>
                        <Button type="submit" variant="success">
                            Update
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateMedicineModal