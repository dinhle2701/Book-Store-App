import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Content from '../components/Content/Content';

const AdminLayout = () => {
    return (
        <div className="adminLayout flex">
            {/* Sidebar sẽ có width cố định, hoặc ẩn tùy theo thiết bị */}
            <Sidebar />

            {/* Nội dung chiếm phần còn lại */}
            <main className="flex-1 min-h-screen overflow-x-hidden">
                <Content />
            </main>
        </div>
    );
};

export default AdminLayout;
