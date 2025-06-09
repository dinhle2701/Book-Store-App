/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import API_PATHS from '../../../../constant/apiPath';
import { useUpdateOrderStatus } from '../../../../query/order'

const OrderModal = ({ order, onClose }) => {
    const { mutate: updateStatus } = useUpdateOrderStatus();
    const [statusUpdates, setStatusUpdates] = useState({}); // Lưu trạng thái tạm thời từng đơn
    const handleStatusChange = (orderId, newStatus) => {
        setStatusUpdates(prev => ({ ...prev, [orderId]: newStatus }));
    };

    const handleUpdateStatus = (orderId) => {
        const newStatus = statusUpdates[orderId];
        if (!newStatus) return alert('Vui lòng chọn trạng thái mới');
        updateStatus({ orderId, status: newStatus });
        onClose();
    };
    if (!order) return null;

    const { name, email, phone, address, status, createdAt, total, cartItems = [], } = order;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'Processing':
                return 'bg-blue-100 text-blue-700';
            case 'Shipping':
                return 'bg-purple-100 text-purple-700';
            case 'Delivered':
                return 'bg-green-100 text-green-700';
            case 'Cancelled':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-600 text-black';
        }
    };



    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center px-4">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-3xl w-full relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold">×</button>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">📦 Chi tiết đơn hàng</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div className='text-left ms-6'>
                        <p><strong>Họ tên:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>SĐT:</strong> {phone}</p>
                        <p><strong>Địa chỉ:</strong> {address}</p>
                        <p><strong>Ngày tạo:</strong> {new Date(createdAt).toLocaleString('vi-VN')}</p>
                        <p>
                            <strong>Trạng thái:</strong>{' '}
                            <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(status)}`}>
                                {status}
                            </span>
                            <td className="px-6 py-4">
                                <select
                                    value={statusUpdates[order._id] || order.status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    className="px-2 py-1 rounded-md border"
                                >
                                    {['Pending', 'Processing', 'Shipping', 'Delivered', 'Cancelled'].map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateStatus(order._id);
                                    }}
                                >
                                    Lưu
                                </button>
                            </td>
                        </p>
                    </div>
                    <div className='max-h-[400px] overflow-y-auto'>
                        <p className="font-semibold mb-2">📚 Sản phẩm:</p>
                        {cartItems.map((item, idx) => (
                            <div key={idx} className="flex gap-3 items-center mb-2 text-left">
                                <img
                                    src={item.img ? `${API_PATHS.img}/${item.img}` : 'https://via.placeholder.com/80x100'}
                                    className="w-16 h-20 object-cover rounded"
                                    alt={item.bookName}
                                />
                                <div>
                                    <p className="font-medium truncate">{item.bookName}</p>
                                    <p>Số lượng: {item.quantity}</p>
                                    <p className="text-yellow-700">Giá: {item.price?.toLocaleString()}đ</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-right text-lg font-bold text-blue-600">
                    🧾 Tổng tiền: {total?.toLocaleString()} VNĐ
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
