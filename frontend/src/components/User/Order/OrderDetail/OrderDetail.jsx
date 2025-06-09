/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOrderDetailByUser } from '../../../../query/order';
import { useUser } from '../../../../context/UserContext';
import Breadcrumbs from '../../../Custom/BreadCrums';
import API_PATHS from '../../../../constant/apiPath'

const OrderDetail = () => {
    const { orderId } = useParams();
    const { user } = useUser();
    const email = user?.email;

    const { data: orders, isLoading, isError, error } = useGetOrderDetailByUser(orderId, email);

    if (isLoading) return <p className="text-center mt-10 text-lg">⏳ Đang tải chi tiết đơn hàng...</p>;
    if (isError) return <p className="text-center text-red-500 mt-10 text-lg">❌ Lỗi: {error.message}</p>;
    if (!orders) return <p className="text-center text-gray-500 mt-10 text-lg">Không tìm thấy đơn hàng.</p>;

    const { name, phone, address, status, createdAt, cartItems = [], total = 0 } = orders;

    const getStatusColor = (status) => {
        switch (status) {
            case 'AWAITING_CONFIRM':
                return 'bg-yellow-100 text-yellow-700';
            case 'CONFIRMED':
                return 'bg-green-100 text-green-700';
            case 'CANCELED':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <>
            <div className='px-6 max-w-screen-xl mx-auto'>
                <Breadcrumbs />
            </div>
            <div className="order-detail max-w-7xl mx-auto mb-12 items-center gap-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">📦 Chi tiết đơn hàng</h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column - Customer Info */}
                    <section className="bg-white shadow-md rounded-xl p-6 col-span-1 ">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">👤 Thông tin khách hàng</h2>
                        <div className="space-y-3 text-gray-700 text-sm text-left ms-16">
                            <p><strong>Họ tên:</strong> {name}</p>
                            <p><strong>Email:</strong> {email}</p>
                            <p><strong>Số điện thoại:</strong> {phone}</p>
                            <p><strong>Địa chỉ giao hàng:</strong> {address}</p>
                            <p><strong>Ngày đặt hàng:</strong> {new Date(createdAt).toLocaleString('vi-VN')}</p>
                            <p>
                                <strong>Trạng thái:</strong>{' '}
                                <span className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(status)}`}>
                                    {status}
                                </span>
                            </p>
                        </div>
                    </section>

                    {/* Right Column - Products + Total */}
                    <section className="col-span-2 flex flex-col gap-6">
                        {/* Scrollable Product List */}
                        <div className="bg-white shadow-md rounded-xl p-6 ">
                                <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">📚 Sản phẩm đã đặt</h2>
                            <div className='max-h-[300px] overflow-y-auto'>
                                {cartItems.length > 0 ? (
                                    <div className="space-y-6">
                                        {cartItems.map((item, index) => (
                                            <div key={index} className="flex gap-4 items-start">
                                                <img
                                                    src={item.img ? `${API_PATHS.img}/${item.img}` : 'https://via.placeholder.com/200x280'}
                                                    alt={item.bookName}
                                                    className="w-24 h-32 object-cover rounded-md shadow"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-800">{item.bookName}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">Số lượng: {item.quantity}</p>
                                                    <p className="text-sm font-medium text-yellow-700 mt-1">
                                                        Đơn giá: {item.price?.toLocaleString()} VNĐ
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center">Không có sản phẩm nào trong đơn hàng này.</p>
                                )}
                            </div>
                        </div>

                        {/* Total Section */}
                        <div className="bg-white shadow-md rounded-xl p-6 text-right">
                            <h2 className="text-xl font-bold text-gray-900">
                                🧾 Tổng tiền:{' '}
                                <span className="text-blue-600">{total?.toLocaleString()} VNĐ</span>
                            </h2>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default OrderDetail;
