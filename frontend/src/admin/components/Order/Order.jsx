/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useGetAllOrders } from '../../../query/order'
import OrderModal from './OrderModal/OrderModal'; // Đường dẫn phù hợp dự án của bạn


const Order = () => {
  const { data: orders, isLoading } = useGetAllOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);


  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    console.log("Selected Order:", selectedOrder);
  };


  if (isLoading) {
    return <p className="text-center mt-8">Loading data...</p>;
  }

  return (
    <div className="w-full min-h-screen px-6 py-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Management</h1>
      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <div className='max-h-[540px] overflow-y-auto'>
          <table className="min-w-full table-auto text-sm text-center text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs sticky top-0">
              <tr>
                <th className="px-6 py-3">STT</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => handleViewDetails(order)}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{order.name}</td>
                  <td className="px-6 py-4">{order.email}</td>
                  <td className="px-6 py-4">{order.address}</td>
                  <td className="px-6 py-4">{order.phone}</td>
                  <td className="px-6 py-4">
                    <button
                      className={`px-2 rounded-xl font-bold ${order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'Processing'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Shipped'
                            ? 'bg-purple-100 text-purple-800'
                            : order.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'Cancelled'
                                ? 'bg-red-100 text-red-800'
                                : order.status === 'Refunded'
                                  ? 'bg-teal-100 text-teal-800'
                                  : order.status === 'Failed'
                                    ? 'bg-gray-300 text-gray-800'
                                    : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                      {order.status || 'N/A'}
                    </button>
                  </td>
                  <td className="px-6 py-4">{order.total?.toLocaleString()}đ</td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <p className="text-gray-500 mt-4">No orders available</p>
          )}
        </div>
      </div>

      {/* Modal hiển thị nếu có selectedOrder */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Order;

