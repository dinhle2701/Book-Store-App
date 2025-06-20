import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useUser } from '../../../context/UserContext';
import { useCart } from '../../../context/CartContext'; // chỉnh path nếu khác
import { Home, ShoppingCart, Heart, Store, Search } from "lucide-react";
import Container from '../../Custom/Container.jsx'

const CustomNavbar = () => {
  const { user, setUser } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);


  const handleInformation = () => {
    window.location.href = '/info';
  };

  const handleOrder = () => {
    window.location.href = '/orders';
  };
  const handleLogout = () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
    if (confirmed) {
      localStorage.removeItem('token');
      setUser(null);
      window.location.href = '/';
    }
  };

  // Auto close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <nav className="bg-white shadow-sm w-full py-2 px-4 md:px-10 sticky top-0 z-50">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-decoration-none text-black font-bold">
            <Store className="w-6 h-6 text-green-600" />

            {/* Mobile: Hiển thị viết tắt */}
            <span className="text-green-600 text-xl sm:hidden">BS</span>

            {/* Desktop: Hiển thị đầy đủ */}
            <span className="hidden sm:inline text-xl md:text-2xl">
              <span className="text-green-600">B</span>ook Store
            </span>
          </Link>



          {/* Search */}
          <div className="flex-grow max-w-xl w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-full border px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Icons + User */}
          <div className="flex items-center gap-10 relative">
            <Link to="/" title="Home" className="hover:text-green-600">
              <Home className="w-5 h-5" />
            </Link>
            <Link to="/favorites" title="Favorites" className="hover:text-green-600">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/cart" title="Cart" className="relative hover:text-green-600">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>


            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 focus:outline-none">
                  <img
                    src={user.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="hidden md:flex flex-col text-sm">
                    <span className="font-semibold text-gray-800">{user.iss || "Username"}</span>
                    <span className="text-gray-600">{user.sub || "User"}</span>
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute text-center right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                    <button
                      onClick={handleInformation}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Information
                    </button>
                    <button
                      onClick={handleOrder}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default CustomNavbar;
