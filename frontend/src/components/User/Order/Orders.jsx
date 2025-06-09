/* eslint-disable no-unused-vars */
import React from 'react';
import { useGetOrdersByUser } from '../../../query/order';
import { useUser } from '../../../context/UserContext';
import Breadcrumbs from '../../Custom/BreadCrums';
import { useNavigate } from 'react-router-dom'; // Thêm nếu chưa có

const Orders = () => {
  const { user } = useUser();
  const email = user?.email;

  const { data: orders = [], isLoading, isError } = useGetOrdersByUser(email);

  const navigate = useNavigate();

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Đã xảy ra lỗi khi tải đơn hàng.</p>;

  return (
    <>
      <div className='px-6 max-w-screen-xl mx-auto'>
        <Breadcrumbs />
      </div>
      <div className="order max-w-7xl mx-auto mb-12 items-center gap-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">ĐƠN HÀNG</h2>
        <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
          {orders.length === 0 ? (
            <p className="text-gray-500 mt-4">Không có đơn hàng nào.</p>
          ) : (
            <table className="min-w-full table-auto text-sm text-center text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">STT</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Địa chỉ</th>
                  <th className="px-6 py-3">Số điện thoại</th>
                  <th className="px-6 py-3">Trạng thái</th>
                  <th className="px-6 py-3">Tổng cộng</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50 hover:cursor-pointer"  onClick={() => navigate(`/orders/${order._id}`)}>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{order.email}</td>
                    <td className="px-6 py-4">{order.address}</td>
                    <td className="px-6 py-4">{order.phone}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Awaiting Confirm'
                          ? 'bg-gray-100 text-gray-800'
                          : order.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : order.status === 'Processing'
                              ? 'bg-blue-100 text-blue-700'
                              : order.status === 'Shipping'
                                ? 'bg-purple-100 text-purple-700'
                                : order.status === 'Delivered'
                                  ? 'bg-green-100 text-green-700'
                                  : order.status === 'Cancelled'
                                    ? 'bg-red-100 text-red-700'
                                    : order.status === 'Failed'
                                      ? 'bg-pink-100 text-pink-800'
                                      : 'bg-gray-200 text-gray-600'
                          }`}
                      >
                        {order.status || 'N/A'}
                      </span>
                    </td>


                    <td className="px-6 py-4">{order.total?.toLocaleString()}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
