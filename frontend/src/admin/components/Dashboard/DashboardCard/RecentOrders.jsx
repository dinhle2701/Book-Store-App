import React from 'react'

const RecentOrders = () => {
    const orders = [
        { id: 'ORD123', user: 'Alice', total: '$120.00', date: '2025-05-28', status: 'Shipped' },
        { id: 'ORD124', user: 'Bob', total: '$85.00', date: '2025-05-28', status: 'Processing' },
        { id: 'ORD125', user: 'Charlie', total: '$230.00', date: '2025-05-27', status: 'Delivered' },
    ]

    return (
        <div className="bg-white shadow-md rounded-xl p-6 m-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📦 Recent Orders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{order.id}</td>
                                <td className="px-6 py-4">{order.user}</td>
                                <td className="px-6 py-4">{order.total}</td>
                                <td className="px-6 py-4">{order.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecentOrders
