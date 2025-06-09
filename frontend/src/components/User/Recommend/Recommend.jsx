/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetBooks } from '../../../query/book';
import { useCart } from '../../../context/CartContext';
import CustomClick from '../../Custom/CustomClick';
import API_PATHS from '../../../constant/apiPath'

const Recommend = () => {
  const { data: latestBooks = [], isLoading, isError } = useGetBooks();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (isLoading) return <p className="text-center mt-10">📦 Đang tải sách mới...</p>;
  if (isError) return <p className="text-center text-red-500 mt-10">❌ Lỗi tải sách mới.</p>;

  return (
    <div className="px-6 py-10 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">🔥 Ưu Đãi Mới Nhất</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {latestBooks.slice(0, 4).map(book => (
          <div
            key={book._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={book.img ? `${API_PATHS.img}/${book.img}` : `http://localhost:5555/${book.image}`}
              alt={book.bookName}
              className="rounded-lg h-64 w-full object-cover mb-4 cursor-pointer"
              onClick={() => navigate(`/books/${book._id}`)}
            />
            <h2 className="text-lg font-semibold text-gray-800 truncate">{book.bookName}</h2>
            <p className="text-sm text-gray-500">Tác giả: {book.author}</p>
            <p className="text-yellow-600 font-bold mt-2">{book.price?.toLocaleString()} VNĐ</p>
            <CustomClick
              onClick={() => addToCart(book)}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
            >
              🛒 Thêm vào giỏ
            </CustomClick>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
