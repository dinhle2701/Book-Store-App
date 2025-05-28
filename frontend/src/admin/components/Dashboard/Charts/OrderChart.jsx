import React from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const OrderChart = () => {
    // Giả lập dữ liệu đơn hàng theo ngày
    const data = [
        { date: 'May 23', orders: 0 },
        { date: 'May 23', orders: 12 },
        { date: 'May 24', orders: 18 },
        { date: 'May 25', orders: 9 },
        { date: 'May 26', orders: 23 },
        { date: 'May 27', orders: 15 },
        { date: 'May 28', orders: 21 },
        { date: 'May 29', orders: 17 }
    ]

    return (
        <div className="bg-white shadow-md rounded-xl p-6 m-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📈 Orders This Week</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#34D399" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default OrderChart
