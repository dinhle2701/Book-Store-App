/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useGetBooks } from '../../../query/book';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../Custom/BreadCrums';
import { useCart } from '../../../context/CartContext';
import CustomClick from '../../Custom/CustomClick';
import API_PATHS from '../../../constant/apiPath'

const BookList = () => {
    const { data: books = [], isLoading, isError, error } = useGetBooks();
    const navigate = useNavigate(); // ✅ Đặt lên đây
    const { addToCart } = useCart();

    if (isLoading) {
        return <p className="text-center text-gray-500 mt-10">Book Loading...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500 mt-10">Lỗi: {error.message}</p>;
    }

    return (
        <>
            <div className='px-6 max-w-screen-xl mx-auto'>
                <Breadcrumbs />
            </div>
            <div className="px-6 py-10 max-w-screen-xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">📚 SÁCH ĐỀ XUẤT</h1>
                {books.length === 0 ? (
                    <p className="text-center text-gray-500">Không có sách nào để hiển thị.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-start">
                        {books.map((book) => (
                            <div
                                key={book._id}
                                className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 p-4 flex flex-col"
                            >
                                <img
                                    onClick={() => navigate(`/books/${book._id}`)}
                                    src={book.img ? `${API_PATHS.img}/${book.img}` : `http://localhost:5555/${book.image}`}
                                    alt={book.bookName}
                                    className="rounded-lg w-full h-64 object-cover mb-4 hover:cursor-pointer"
                                />

                                <h2 className="text-lg font-bold text-gray-800 truncate">{book.bookName}</h2>
                                <p className="text-sm text-gray-600">📖 Tác giả: {book.author}</p>
                                <p className="text-sm text-gray-600">📦 Số lượng: {book.count}</p>
                                <p className="text-sm text-gray-600">📚 Loại: {book.type}</p>
                                <p className="text-yellow-600 font-semibold text-lg mt-2">{book.price?.toLocaleString()} VNĐ</p>
                                <CustomClick
                                    onClick={() => addToCart(book)}
                                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                                >
                                    📘 Thêm vào giỏ
                                </CustomClick>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default BookList;
