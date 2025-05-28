import React from 'react'

const Order = () => {
    return (
        <div className="w-full min-h-screen px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Management</h1>

            {/* Danh sách người dùng - Placeholder */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <p className="text-gray-600">Hiện chưa có dữ liệu người dùng. Tính năng sẽ được cập nhật sau.</p>
                <table className="min-w-full table-auto border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Tên</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Vai trò</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Lặp qua danh sách user */}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Order
