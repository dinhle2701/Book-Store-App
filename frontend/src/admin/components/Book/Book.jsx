/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    useGetBooks,
    useCreateBook,
    useDeleteBook,
    useUpdateBook,
    useGetBookById
} from '../../../query/book';
import CreateBookModal from './CreateBook.jsx'; // Đảm bảo đúng đường dẫn
import UpdateBookModal from './UpdateBook.jsx'; // Đảm bảo đúng đường dẫn


const Book = () => {
    const { data: books = [], isLoading, isError, error } = useGetBooks();
    const [showModal, setShowModal] = useState(false);

    const deleteBook = useDeleteBook(); // ✅ hook xóa

    const handleDelete = (id) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sách này?");
        if (confirmed) {
            deleteBook.mutate(id, {
                onSuccess: () => {
                    alert("Xóa sách thành công!");
                },
                onError: (err) => {
                    alert("Lỗi khi xóa sách: " + err.message);
                }
            });
        }
    }


    const [selectedBook, setSelectedBook] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const openUpdateModal = (book) => {
        console.log("Selected book:", book);
        setSelectedBook(book);
        setShowUpdateModal(true);
    };



    return (
        <div className="w-full min-h-screen px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Management 📚</h1>

            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="text-end">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
                        onClick={() => setShowModal(true)}
                    >
                        ➕ New Book
                    </button>
                </div>

                {isLoading ? (
                    <p className="text-center text-gray-500">Đang tải danh sách sách...</p>
                ) : isError ? (
                    <p className="text-center text-red-500">Lỗi: {error.message}</p>
                ) : books.length === 0 ? (
                    <p className="text-center text-gray-500">Không có sách nào.</p>
                ) : (
                    <table className="min-w-full text-sm text-center text-gray-700">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Tác giả</th>
                                <th className="px-6 py-3">Số lượng</th>
                                <th className="px-6 py-3">Loại</th>
                                <th className="px-6 py-3">Đã bán</th>
                                <th className="px-6 py-3">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{book.bookName}</td>
                                    <td className="px-6 py-4">{book.author}</td>
                                    <td className="px-6 py-4">{book.count}</td>
                                    <td className="px-6 py-4">{book.type}</td>
                                    <td className="px-6 py-4">{book.sold}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-500 hover:underline mr-2"
                                            onClick={() => openUpdateModal(book)}>Sửa</button>
                                        <button className="text-red-500 hover:underline"
                                            onClick={() => handleDelete(book._id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal hiển thị khi showModal = true */}
            <CreateBookModal isOpen={showModal} onClose={() => setShowModal(false)} />
            <UpdateBookModal
                isOpen={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                book={selectedBook}
            />
        </div>
    );
};

export default Book;
