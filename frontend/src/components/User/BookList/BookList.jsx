import React, { useState } from 'react';
import { useGetBooks } from '../../../query/book';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../Custom/BreadCrums';
import { useCart } from '../../../context/CartContext';
import CustomClick from '../../Custom/CustomClick';
import API_PATHS from '../../../constant/apiPath';

const BookList = () => {
    const { data: books = [], isLoading, isError, error } = useGetBooks();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    // Lấy danh sách loại sách duy nhất
    const uniqueTypes = [...new Set(books.map(book => book.type).filter(Boolean))];

    // Áp dụng tìm kiếm, lọc, sắp xếp
    const filteredBooks = books
        .filter(book =>
            book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterType ? book.type === filterType : true)
        )
        .sort((a, b) => {
            if (sortOrder === 'asc') return a.price - b.price;
            if (sortOrder === 'desc') return b.price - a.price;
            return 0;
        });

    if (isLoading) return <p className="text-center mt-10">📦 Đang tải danh sách sách...</p>;
    if (isError) return <p className="text-center text-red-500 mt-10">❌ Lỗi: {error.message}</p>;

    return (
        <>
            <div className="px-6 max-w-screen-xl mx-auto">
                <Breadcrumbs />
            </div>

            <div className="px-6 py-10 max-w-screen-xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">📚 Danh Sách Sách</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Bộ lọc */}
                    <div className="bg-white shadow rounded-xl p-4 h-fit">
                        <h2 className="text-xl font-semibold mb-4">🔍 Tìm kiếm & Bộ lọc</h2>

                        {/* Tìm kiếm */}
                        <input
                            type="text"
                            placeholder="🔎 Tên sách..."
                            className="w-full p-2 border rounded mb-4"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        {/* Lọc theo loại sách */}
                        <label className="block mb-2 font-medium">📚 Danh mục:</label>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        >
                            <option value="">-- Tất cả loại --</option>
                            {uniqueTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>

                        {/* Sắp xếp theo giá */}
                        <label className="block mb-2 font-medium">💰 Sắp xếp theo giá:</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">-- Không sắp xếp --</option>
                            <option value="asc">Giá tăng dần</option>
                            <option value="desc">Giá giảm dần</option>
                        </select>
                    </div>

                    {/* Grid sách */}
                    <div className="md:col-span-3">
                        {filteredBooks.length === 0 ? (
                            <p className="text-center text-gray-500">Không có sách phù hợp.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredBooks.map((book) => (
                                    <div
                                        key={book._id}
                                        className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 p-4 flex flex-col"
                                    >
                                        <img
                                            onClick={() => navigate(`/books/${book._id}`)}
                                            src={book.img ? `${API_PATHS.img}/${book.img}` : 'https://via.placeholder.com/200x280'}
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
                </div>
            </div>
        </>
    );
};

export default BookList;
