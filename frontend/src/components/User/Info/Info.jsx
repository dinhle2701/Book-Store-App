import React from 'react';
import { useUser } from '../../../context/UserContext';
import Breadcrumbs from '../../Custom/BreadCrums';

const Info = () => {
    const { user } = useUser();

    if (!user) {
        return <p className="text-center mt-6">Loading information...</p>;
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log('File đã chọn:', file);
        // Xử lý upload hoặc cập nhật avatar ở đây
    };

    return (
        <>
            <div className='px-6 max-w-screen-xl mx-auto'>
                <Breadcrumbs />
            </div>
            <div className="mt-6 max-w-5xl mx-auto px-4">

                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">PERSONAL INFORMATION</h2>

                <div className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-md rounded-lg p-6 gap-6">

                    {/* Avatar + Upload */}
                    <div className="flex flex-col items-center md:w-1/3">
                        <img
                            src={user.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
                            alt="Avatar"
                            className="rounded-full shadow-md w-48 h-48 object-cover"
                        />
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="mt-4 w-full md:w-3/4 text-sm file:mr-4 file:py-2 file:px-4
                                   file:rounded-full file:border-0 file:text-sm file:font-semibold
                                   file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                    </div>

                    {/* Info Table */}
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-600 mb-4 text-center md:text-left">
                            {user.iss || 'Unknown'}
                        </h3>
                        <div className="text-sm text-gray-700">
                            <div className="flex mb-2">
                                <span className="font-semibold w-24">Email:</span>
                                <span>{user.email || 'Unknown'}</span>
                            </div>
                            <div className="flex mb-2">
                                <span className="font-semibold w-24">Role:</span>
                                <span>{user.role || 'Unknown'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Info;
