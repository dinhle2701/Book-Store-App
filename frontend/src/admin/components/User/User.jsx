/* eslint-disable no-unused-vars */
import React from 'react'
import { useGetUsers } from '../../../query/stat'

const User = () => {
  const { data, isLoading } = useGetUsers()
  const users = data?.users || [];

  console.log(users)

  return (
    <div className="w-full min-h-screen px-6 py-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>

      {/* Danh sách người dùng - Placeholder */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="min-w-full table-auto bordermin-w-full text-sm text-center text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">STT</th>
              <th className="px-6 py-3">Tên</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Vai trò</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 hover:cursor-pointer">
                <td className="px-6 py-4 ">{index}</td>
                <td className="px-6 py-4 ">{user.username}</td>
                <td className="px-6 py-4 ">{user.email}</td>
                <td className="px-6 py-4 ">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default User
