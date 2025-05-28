import React from 'react'

const RecentUsers = () => {
    const users = [
        { name: 'Alice Johnson', email: 'alice@example.com', joined: '2025-05-28' },
        { name: 'Bob Smith', email: 'bob@example.com', joined: '2025-05-27' },
        { name: 'Charlie Brown', email: 'charlie@example.com', joined: '2025-05-26' },
    ]

    return (
        <div className="bg-white shadow-md rounded-xl p-6 m-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">👤 Recent Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.joined}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RecentUsers
