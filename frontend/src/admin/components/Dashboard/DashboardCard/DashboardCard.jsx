import React from 'react'
import { User, BookOpen, ShoppingCart } from 'lucide-react'
import { useGetStat } from '../../../../query/stat'

const DashboardCard = () => {
    const { data: stat, isLoading } = useGetStat()

    const stats = [
        {
            title: 'Users',
            count: stat?.usersCount ?? 0,
            icon: <User className="w-8 h-8 text-blue-600" />,
            color: 'bg-blue-100',
        },
        {
            title: 'Books',
            count: stat?.booksCount ?? 0,
            icon: <BookOpen className="w-8 h-8 text-green-600" />,
            color: 'bg-green-100',
        },
        {
            title: 'Orders',
            count: stat?.ordersCount ?? 0,
            icon: <ShoppingCart className="w-8 h-8 text-orange-600" />,
            color: 'bg-orange-100'
        }
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {stats.map((item, index) => (
                <div key={index} className={`flex items-center gap-4 p-6 rounded-xl shadow-md ${item.color}`}>
                    <div className="p-3 bg-white rounded-full shadow">{item.icon}</div>
                    <div>
                        <p className="text-sm text-gray-600">{item.title}</p>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {isLoading ? '...' : item.count}
                        </h2>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DashboardCard
