/* eslint-disable no-unused-vars */
import { React } from 'react'
import { useUser } from '../../../context/UserContext';
import { Link } from 'react-router-dom'
import { BookOpen, Store, ShoppingBasket, User, LogOut } from 'lucide-react'

const Sidebar = () => {
    const { user, setUser } = useUser(); // Dùng context

    const handleLogout = () => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
        if (confirmed) {
            localStorage.removeItem('token');
            setUser(null);
            window.location.href = '/';
        }
    };


    return (
        <div className="admin-sidebar sticky top-0 h-screen bg-white border-r p-6 shadow-lg flex flex-col">
            {/* Logo */}
            <Link to="/admin" className='text-decoration-none mx-auto'>
                <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-10 p-3  shadow-md hover:shadow-lg transition-shadow duration-300">
                    <Store className="w-6 h-6 text-green-600" />
                    <span>
                        <span className="text-green-600">B</span>ook Store
                    </span>
                </h1>
            </Link>


            {/* Navigation */}
            <nav className="navigate flex flex-col gap-3">
                <Link
                    to="/admin/books"
                    className="flex items-center text-decoration-none gap-3 px-4 py-2 rounded-lg text-gray-700 text-base font-medium hover:bg-green-100 hover:text-green-700 transition-all duration-200"
                >
                    <BookOpen className="w-5 h-5" />
                    <strong>Book</strong>
                </Link>

                <Link
                    to="/admin/users"
                    className="flex items-center text-decoration-none gap-3 px-4 py-2 rounded-lg text-gray-700 text-base font-medium hover:bg-green-100 hover:text-green-700 transition-all duration-200"
                >
                    <User className="w-5 h-5" />
                    <strong>User</strong>
                </Link>

                <Link
                    to="/admin/orders"
                    className="flex items-center text-decoration-none gap-3 px-4 py-2 rounded-lg text-gray-700 text-base font-medium hover:bg-green-100 hover:text-green-700 transition-all duration-200"
                >
                    <ShoppingBasket className="w-5 h-5" />
                    <strong>Order</strong>
                </Link>
            </nav>

            {/* Logout button at bottom */}
            <div className="logout mt-auto pt-4 border-t">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 font-semibold hover:bg-red-100 transition-all duration-200"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </div >
    )
}

export default Sidebar
