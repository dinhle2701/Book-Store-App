import React, { useState } from "react";
import { useCreateBook } from "../../../query/book";

const CreateBookModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        bookName: "",
        price: "",
        supplier: "",
        publisher: "",
        author: "",
        count: "",
        type: ""
    });

    const createBook = useCreateBook();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createBook.mutate(formData, {
            onSuccess: () => {
                alert("📘 Book created successfully!");
                setFormData({
                    bookName: "",
                    price: "",
                    supplier: "",
                    publisher: "",
                    author: "",
                    count: "",
                    type: ""
                });
                onClose();
            },
            onError: (error) => {
                alert("❌ Failed to create book: " + error.message);
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6 relative">
                <button
                    onClick={() => onClose}
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
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-2 mt-1"
                        >
                            <option value="">-- Chọn loại bìa --</option>
                            <option value="Bìa mềm">Bìa mềm</option>
                            <option value="Bìa cứng tiếng Anh">Bìa cứng tiếng Anh</option>
                        </select>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">Publisher</label>
                        <input
                            type="text"
                            name="publisher"
                            value={formData.publisher}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-2 mt-1"
                        />
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
