/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetBooks } from '../../../query/book';
import { useCart } from '../../../context/CartContext';
import CustomClick from '../../Custom/CustomClick';
import API_PATHS from '../../../constant/apiPath'
import { useToast } from '../../../context/ToastContext';

const Recommend = () => {
  const { showToast } = useToast();
  const { data: latestBooks = [], isLoading, isError } = useGetBooks();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const fallbackImage = 'https://cdn2.iconfinder.com/data/icons/packing/80/shipping-34-512.png';

  if (isLoading) return <p className="text-center mt-10">📦 Book loading...</p>;
  if (isError) return <p className="text-center text-red-500 mt-10">❌ Failed to load books.</p>;
  if (latestBooks.length === 0) return <p className="text-center mt-10 text-gray-500">😢 No books available at the moment.</p>;

  return (
    <div className="px-6 py-10 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">🔥 New Recommend</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {latestBooks.slice(0, 4).map(book => (
          <div
            key={book._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              onClick={() => navigate(`/books/${book._id}`)}
              src={`${API_PATHS.img}/${book.img}`}
              alt={book.bookName}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
              className="rounded-lg w-full h-64 object-cover mb-4 hover:cursor-pointer"
            />
            <h2 className="text-lg font-semibold text-gray-800 truncate">{book.bookName}</h2>
            <p className="text-sm text-gray-500">{book.author}</p>
            <p className="text-yellow-600 font-bold mt-2">{book.price?.toLocaleString()} VNĐ</p>
            <CustomClick
              onClick={() => {
                addToCart(book);
                showToast(`🛒 Book added to cart!`, 'success');
              }}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
            >
              🛒 Add to cart
            </CustomClick>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Recommend;
