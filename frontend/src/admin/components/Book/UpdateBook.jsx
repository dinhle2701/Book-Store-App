import React, { useEffect, useState } from "react";
import { useUpdateBook } from "../../../query/book";

const UpdateBookModal = ({ isOpen, onClose, book }) => {
    const [formData, setFormData] = useState(() => book || {});
    const updateBook = useUpdateBook();

    // Khi book prop thay đổi (ví dụ click vào sách khác), cập nhật form
    useEffect(() => {
        if (book) {
            setFormData({ ...book });
        }
    }, [book]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // So sánh dữ liệu trước khi gửi
        const isChanged = Object.keys(formData).some(
            (key) => formData[key] !== book[key]
        );

        if (!isChanged) {
            alert("Bạn chưa thay đổi dữ liệu nào.");
            return;
        }

        updateBook.mutate(
            { id: book._id, updatedBook: formData },  // chú ý đổi `data` thành `updatedBook`
            {
                onSuccess: () => {
                    alert("Cập nhật sách thành công!");
                    onClose();
                },
                onError: (err) => {
                    alert("Lỗi khi cập nhật sách: " + err.message);
                },
            }
        );

    };

    if (!isOpen || !book) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center">Chỉnh sửa sách</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Tên sách" name="bookName" value={formData.bookName} onChange={handleChange} />
                    <Input label="Tác giả" name="author" value={formData.author} onChange={handleChange} />
                    <Input label="Nhà xuất bản" name="publisher" value={formData.publisher} onChange={handleChange} />
                    <Input label="Nhà cung cấp" name="supplier" value={formData.supplier} onChange={handleChange} />
                    <Input label="Số lượng" name="count" type="number" value={formData.count} onChange={handleChange} />
                    <Input label="Giá" name="price" type="number" value={formData.price} onChange={handleChange} />

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Loại bìa</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-2 mt-1"
                        >
                            <option value="Paperback">Paperback</option>
                            <option value="Hardcover">Hardcover</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={updateBook.isLoading}
                        className="w-full bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 transition"
                    >
                        {updateBook.isLoading ? "Đang cập nhật..." : "Cập nhật sách"}
                    </button>
                </form>
            </div>
        </div>
    );
};

const Input = ({ label, name, type = "text", value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-xl p-2 mt-1 focus:ring focus:ring-blue-200"
        />
    </div>
);

export default UpdateBookModal;
