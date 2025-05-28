import React from 'react'
import CustomNavbar from '../User/Navbar/CustomNavbar.jsx'
import { Outlet } from 'react-router-dom';


const UserDashboard = () => {
    return (
        <div className='user_dashboard'>
            <CustomNavbar />
            
            <div className="flex-grow-1 w-100">
                {/* nội dung sẽ được render ở đây tùy theo route con */}
                <Outlet />
            </div>
        </div>
    )
}

export default UserDashboard
