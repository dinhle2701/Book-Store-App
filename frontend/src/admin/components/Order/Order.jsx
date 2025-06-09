/* eslint-disable no-unused-vars */
import React from 'react'
import { useGetAllOrders } from '../../../query/order'

const Order = () => {
  const { data: orders, isLoading } = useGetAllOrders();

  const handleViewDetails = (order) => {
    console.log('Chi tiết đơn hàng:', order);
    // TODO: Mở modal hoặc chuyển trang hiển thị chi tiết đơn hàng
  };

  const handleUpdateStatus = (order) => {
    console.log('Sửa trạng thái đơn hàng:', order);
    // TODO: Mở modal chọn trạng thái mới hoặc gọi API cập nhật
  };


  if (isLoading) {
    return <p className="text-center mt-8">Đang tải dữ liệu...</p>;
  }

  return (
    <div className="w-full min-h-screen px-6 py-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Management</h1>

      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-center text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">STT</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="border-b hover:bg-gray-50 hover:cursor-pointer">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{order.name}</td>
                <td className="px-6 py-4">{order.email}</td>
                <td className="px-6 py-4">{order.address}</td>
                <td className="px-6 py-4">{order.phone}</td>
                <td className="px-6 py-4">{order.status || 'N/A'}</td>
                <td className="px-6 py-4">{order.total?.toLocaleString()}đ</td>
                <td className="px-6 py-4 flex items-center justify-center gap-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={() => handleViewDetails(order)}
                  >
                    Xem chi tiết
                  </button>
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    onClick={() => handleUpdateStatus(order)}
                  >
                    Sửa trạng thái
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-gray-500 mt-4">Không có đơn hàng nào.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
