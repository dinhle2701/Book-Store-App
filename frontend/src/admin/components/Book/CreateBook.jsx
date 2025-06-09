import React, { useState } from "react";
import { useCreateBook } from "../../../query/book";
import { useToast } from '../../../context/ToastContext';

const CreateBookModal = ({ isOpen, onClose }) => {
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        bookName: "",
        price: "",
        supplier: "",
        publisher: "",
        author: "",
        count: "",
        type: "",
        image: null,
    });

    const createBook = useCreateBook();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, image: file }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            payload.append(key, value);
        });

        createBook.mutate(payload, {
            onSuccess: () => {
                showToast('📘 Book created successfully!', 'success');
                setFormData({
                    bookName: "",
                    price: "",
                    supplier: "",
                    publisher: "",
                    author: "",
                    count: "",
                    type: "",
                    image: null
                });
                onClose();
            },
            onError: (error) => {
                showToast("❌ Failed to create book: " + error.message);
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose} // Click ngoài modal thì đóng
        >
            <div
                className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6 relative"
                onClick={(e) => e.stopPropagation()} // Ngăn không cho click bên trong modal làm đóng modal
            >
                <button
                    onClick={onClose}  // gọi trực tiếp hàm onClose
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center">➕ Create New Book</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Book Title</label>
                        <input
                            type="text"
                            name="bookName"
                            value={formData.bookName}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Book Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-2 mt-1"
                        >
                            <option value="">-- Choose book type --</option>
                            <option value="Self-Help">Self-Help</option>
                            <option value="Inspirational">Inspirational</option>
                            <option value="Science and technology">Science and technology</option>
                            <option value="Cookbooks">Cookbooks</option>
                            <option value="Horror and mystery">Horror and mystery</option>
                            <option value="History">History</option>
                            <option value="Social and cultural">Social and cultural </option>
                            <option value="Religious">Religious</option>
                            <option value="Psychological and emotional">Psychological and emotional</option>
                            <option value="English">English</option>
                            <option value="Exam preparation">Exam preparation</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Publisher</label>
                        <select
                            name="publisher"
                            value={formData.publisher}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-2 mt-1"
                        >
                            <option value="">-- Choose book type --</option>
                            <option value="Vietnam Education Publishing House">Vietnam Education Publishing House</option>
                            <option value="Youth Publishing House">Youth Publishing House</option>
                            <option value="Kim Dong Publishing House">Kim Dong Publishing House</option>
                            <option value="Literature Publishing House">Literature Publishing House</option>
                            <option value="Ho Chi Minh City General Publishing House">Ho Chi Minh City General Publishing House</option>
                            <option value="National Political Publishing House – Truth">National Political Publishing House – Truth</option>
                            <option value="Labor Publishing House">Labor Publishing House</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Supplier</label>
                        <input
                            type="text"
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Count</label>
                        <input
                            type="number"
                            name="count"
                            value={formData.count}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-2 mt-1"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Book Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={handleImageChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-2 mt-1"
                        />
                    </div>

                    <div className="col-span-2 mt-4">
                        <button
                            type="submit"
                            disabled={createBook.isLoading}
                            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                        >
                            {createBook.isLoading ? "Creating..." : "Create Book"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateBookModal;
