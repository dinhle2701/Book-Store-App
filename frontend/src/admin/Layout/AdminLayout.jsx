import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Content from '../components/Content/Content'

const AdminLayout = () => {
    return (
        <div className="adminLayout">
            <div className="relative grid grid-cols-[15%_85%] grid-rows-1">
                <Sidebar />
                <Content/>
            </div>
        </div>
    )
}

export default AdminLayout