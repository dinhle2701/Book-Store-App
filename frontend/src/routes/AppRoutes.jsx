/* eslint-disable no-unused-vars */
// routes/AppRouter.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/User/Home/Home.jsx";
import Login from "../page/Login/Login.jsx";
import Register from "../page/Register/Register.jsx";
import UserDashboard from '../components/Dashboard/UserDashboard.jsx';
import Info from '../components/User/Info/Info.jsx';
import AdminDashboard from "../admin/AdminDashboard.jsx";
import Book from "../admin/components/Book/Book.jsx";
import User from "../admin/components/User/User.jsx";
import Order from "../admin/components/Order/Order.jsx";
import Dashboard from "../admin/components/Dashboard/Dashboard.jsx";

import BookDetail from "../components/User/BookDetail/BookDetail.jsx";
import Cart from "../components/User/Cart/Cart.jsx";
import BookList from "../components/User/BookList/BookList.jsx";
import Checkout from "../components/User/Checkout/Checkout.jsx";
import Favourite from "../components/User/Favourite/Favourite.jsx";
import Orders from "../components/User/Order/Orders.jsx";
import OrderDetail from "../components/User/Order/OrderDetail/OrderDetail.jsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<UserDashboard />}>
                <Route path='/' index element={<Home />}
                />
                <Route path='/info' element={<Info />} />
                <Route path='/favorites' element={<Favourite />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/orders/:orderId' element={<OrderDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/books/:id" element={<BookDetail />} />
                <Route path="/checkout" element={<Checkout/>}/>
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path='/admin' element={<AdminDashboard />}>
                <Route path='/admin' element={<Dashboard />} />
                <Route path='/admin/books' element={<Book />} />
                <Route path='/admin/book' element={<BookDetail/>}/>
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
