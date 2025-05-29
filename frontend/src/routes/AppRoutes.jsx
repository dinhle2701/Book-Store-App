/* eslint-disable no-unused-vars */
// routes/AppRouter.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "../components/Home/Home.jsx";
import Login from "../page/Login/Login.jsx";
import Register from "../page/Register/Register.jsx";
import UserDashboard from '../components/Dashboard/UserDashboard.jsx';
import Info from '../components/User/Info/Info.jsx';
import AdminDashboard from "../admin/AdminDashboard.jsx";
import Book from "../admin/components/Book/Book.jsx";
import User from "../admin/components/User/User.jsx";
import Order from "../admin/components/Order/Order.jsx";
import Dashboard from "../admin/components/Dashboard/Dashboard.jsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<UserDashboard />}>
                {/* <Route path='/' index element={<Home />} /> */}
                <Route path='/info' element={<Info />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path='/admin' element={<AdminDashboard />}>
                <Route path='/admin' element={<Dashboard />} />
                <Route path='/admin/books' element={<Book />} />
                <Route path='/admin/users' element={<User />} />
                <Route path='/admin/orders' element={<Order />} />
            </Route>
        </Routes>
        // <Routes>
        //     <Route path="/" element={<Home />} />
        //     {/* <Route path="/book/:id" element={<BookDetail />} />
        //     <Route path="/cart" element={<Cart />} /> */}
        //     <Route path="/login" element={<Login />} />
        //     <Route path="/register" element={<Register />} />

        //     {/* Admin protected routes */}
        //     {/* <Route element={<ProtectedRoute adminOnly={true} />}>
        //         <Route path="/admin" element={<AdminDashboard />} />
        //         <Route path="/admin/add" element={<AddBook />} />
        //         <Route path="/admin/edit/:id" element={<EditBook />} />
        //     </Route> */}

        //     <Route path="*" element={<NotFound />} />
        // </Routes>
    );
}
