import React, { useState } from 'react';
import { useUser } from '../../../context/UserContext';
import { Link } from 'react-router-dom';
import { BookOpen, Store, ShoppingBasket, User, LogOut, Menu } from 'lucide-react';

const Sidebar = () => {
    const { user, setUser } = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
        if (confirmed) {
            localStorage.removeItem('token');
            setUser(null);
            window.location.href = '/';
        }
    };

    return (
        <div className='h-svh sticky top-0'>
            {/* Toggle button for mobile */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-800 bg-white p-2 rounded shadow-md"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`
                    fixed top-0 left-0 z-40 h-full bg-white border-r shadow-lg p-6 flex flex-col
                    transition-transform duration-300 ease-in-out
                    md:relative md:translate-x-0 md:flex
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    w-64 md:w-52 lg:w-64
                `}
            >
                {/* Logo */}
                <Link to="/admin" className="text-decoration-none mx-auto">
                    <h1 className="flex items-center gap-2 text-xl lg:text-2xl font-bold text-gray-800 mb-10 p-3 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <Store className="w-6 h-6 text-green-600" />
                        <span className="hidden sm:inline">
                            <span className="text-green-600">B</span>ook Store
                        </span>
                    </h1>
                </Link>

                {/* Navigation */}
                <nav className="flex flex-col gap-3">
                    <Link to="/admin/books" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 text-base font-medium hover:bg-green-100 hover:text-green-700 transition-all duration-200">
                        <BookOpen className="w-5 h-5" />
                        <span className="hidden sm:inline"><strong>Book</strong></span>
                    </Link>
                    <Link to="/admin/users" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 text-base font-medium hover:bg-green-100 hover:text-green-700 transition-all duration-200">
                        <User className="w-5 h-5" />
                        <span className="hidden sm:inline"><strong>User</strong></span>
                    </Link>
                    <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 text-base font-medium hover:bg-green-100 hover:text-green-700 transition-all duration-200">
                        <ShoppingBasket className="w-5 h-5" />
                        <span className="hidden sm:inline"><strong>Order</strong></span>
                    </Link>
                </nav>

                {/* Logout button */}
                <div className="mt-auto pt-5 border-t">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 font-semibold hover:bg-red-100 transition-all duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>

            {/* Overlay when sidebar is open on mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default Sidebar;
