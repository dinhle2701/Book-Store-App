/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookById, useAddReview } from '../../../query/book';
import { useUser } from '../../../context/UserContext';
import { useQueryClient } from '@tanstack/react-query';

const BookDetail = () => {
    const { id } = useParams();
    const { user } = useUser(); // từ UserProvider
    const userId = user ? user.iss : null;
    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const { data: book, isLoading, isError, error } = useGetBookById(id);
    const { mutate: addReview } = useAddReview();

    // Lấy reviews từ book, nếu chưa có thì mặc định mảng rỗng
    const reviews = book?.reviews || [];

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    // Kiểm tra user đã đánh giá chưa dựa trên userId
    const hasReviewed = reviews.some((review) => review.user === userId);

    // Tính điểm trung bình
    const averageRating = reviews.length
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : null;

    const handleSubmitReview = (e) => {
        e.preventDefault();

        if (!rating || !comment.trim()) {
            alert('Vui lòng chọn số sao và nhập nhận xét.');
            return;
        }

        const reviewData = {
            bookId: id,
            rating,
            comment,
        };

        addReview(reviewData, {
            onSuccess: () => {
                alert('Đánh giá của bạn đã được gửi!');
                setRating(0);
                setComment('');
                // Refetch lại dữ liệu book (bao gồm reviews)
                queryClient.invalidateQueries(['book', id]);
            },
            onError: (err) => {
                console.error('Lỗi khi gửi đánh giá:', err);
                if (err.response) {
                    console.error('Response data:', err.response.data);
                }
                alert('Đã xảy ra lỗi khi gửi đánh giá.');
            },
        });
    };

    if (isLoading) return <p className="text-center text-gray-500 mt-10">Đang tải chi tiết sách...</p>;
    if (isError) return <p className="text-center text-red-500 mt-10">Lỗi: {error.message}</p>;
    if (!book) return <p className="text-center text-gray-500 mt-10">Không tìm thấy sách.</p>;

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="text-start">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-blue-500 hover:underline text-start"
                >
                    ← Quay lại
                </button>
            </div>

            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden text-start">
                <img
                    src={book.imageUrl || 'https://via.placeholder.com/300x400?text=No+Image'}
                    alt={book.bookName}
                    className="w-full md:w-1/3 object-cover text-center"
                />
                <div className="p-6 flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{book.bookName}</h1>
                    <p className="text-gray-700 text-base mb-2">📖 <strong>Tác giả:</strong> {book.author}</p>
                    <p className="text-gray-700 text-base mb-2">📚 <strong>Thể loại:</strong> {book.type}</p>
                    <p className="text-gray-700 text-base mb-2">🏢 <strong>Nhà xuất bản:</strong> {book.publisher}</p>
                    <p className="text-gray-700 text-base mb-2">🔥 <strong>Đã bán:</strong> {book.sold}</p>
                    <p className="text-gray-700 text-base mb-2">📦 <strong>Số lượng còn lại:</strong> {book.count}</p>
                    <p className="text-yellow-600 font-bold text-2xl mb-6">{book.price?.toLocaleString()} VNĐ</p>

                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        🛒 Thêm vào giỏ hàng
                    </button>
                </div>
            </div>

            {/* Đánh giá và Nhận xét */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Đánh giá và nhận xét</h2>

                {averageRating && (
                    <p className="text-yellow-600 text-lg font-medium mb-2">
                        ⭐ Trung bình: {averageRating} / 5 ({reviews.length} đánh giá)
                    </p>
                )}

                {reviews.length > 0 ? (
                    <div className="space-y-4 mb-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="border p-4 rounded bg-gray-50">
                                <div className="flex items-center gap-1 mb-1 text-yellow-500">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <span key={i}>⭐</span>
                                    ))}
                                    <p className="text-xs text-gray-400 mt-1">
                                        Ngày: {new Date(review.createdAt).toLocaleDateString()}
                                        {review.username && ` | Người dùng: ${review.username}`}
                                    </p>
                                </div>
                                <p className="text-sm text-gray-700 text-start">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 mb-4">Chưa có đánh giá nào.</p>
                )}

                {/* Form đánh giá */}
                {hasReviewed ? (
                    <p className="text-green-600 font-medium">Bạn đã gửi đánh giá cho sách này rồi.</p>
                ) : (
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Số sao:</label>
                            <select
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                className="mt-1 px-4 py-2 border rounded w-32"
                            >
                                <option value={0} disabled>
                                    Chọn
                                </option>
                                <option value={1}>1 ⭐</option>
                                <option value={2}>2 ⭐⭐</option>
                                <option value={3}>3 ⭐⭐⭐</option>
                                <option value={4}>4 ⭐⭐⭐⭐</option>
                                <option value={5}>5 ⭐⭐⭐⭐⭐</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nhận xét:</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={3}
                                placeholder="Nhập nhận xét của bạn..."
                                className="w-full mt-1 px-4 py-2 border rounded"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                        >
                            Gửi đánh giá
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BookDetail;
