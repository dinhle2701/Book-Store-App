import React from 'react'
import DashboardCard from './DashboardCard/DashboardCard'
import OrderChart from './Charts/OrderChart'
import RecentOrders from './DashboardCard/RecentOrders'
import RecentUsers from './DashboardCard/RecentUsers'

const Dashboard = () => {

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800 pt-6">Admin Dashboard</h1>
            <DashboardCard />
            <OrderChart />
            <RecentOrders />
            <RecentUsers />
        </div>
    )
}

export default Dashboard
