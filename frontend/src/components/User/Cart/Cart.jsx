/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Heart, Trash, Minus, Plus } from 'lucide-react';
import Breadcrumbs from '../../Custom/BreadCrums';
import { useCart } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import API_PATHS from '../../../constant/apiPath';

const Cart = () => {
    const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const delivery = cartItems.length > 0 ? 0 : 0;
    const total = subtotal + delivery;

    const navigate = useNavigate(); // ✅ Đặt lên đây

    return (
        <>
            <div className='px-6 max-w-screen-xl mx-auto'>
                <Breadcrumbs />
            </div>
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* LEFT: Product List */}
                <div className="md:col-span-2 bg-white px-6 py-4">
                    <h2 className="text-3xl text-start font-bold mb-6">Giỏ hàng</h2>
                    <div className="space-y-6">
                        {cartItems.length === 0 ? (
                            <p className="text-center text-gray-500">Giỏ hàng trống, tiếp tục mua sắm</p>
                        ) : (
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item.id}>
                                        <div className="flex items-start justify-between gap-4">
                                            <img src={item.img ? `${API_PATHS.img}/${item.img}` : 'https://via.placeholder.com/200x280'} alt={item.title} className="w-32 h-32 object-cover rounded" />
                                            <div className="flex-1 text-start items-start">
                                                <h3 className="font-semibold text-lg">{item.bookName}</h3>
                                                <p className="text-sm text-gray-600">Type: {item.type}</p>
                                                <p className="text-sm text-gray-600">Count: {item.count}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-3">
                                                <p className="font-bold text-lg">{(item.price * item.quantity).toFixed(0)} đ</p>
                                                <div className="flex items-center border rounded px-2 py-1">
                                                    <Minus size={16} className="cursor-pointer text-gray-600" onClick={() => decreaseQuantity(item._id)} />
                                                    <span className="px-3">{item.quantity}</span>
                                                    <Plus size={16} className="cursor-pointer text-gray-600" onClick={() => increaseQuantity(item._id)} />
                                                </div>
                                                <div className="flex gap-3 text-gray-600">
                                                    <Heart className="cursor-pointer" />
                                                    <Trash className="cursor-pointer" onClick={() => removeFromCart(item._id)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-gray-200 mt-6"></div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: Order Summary */}
                <div className="bg-white p-6 rounded shadow-md h-fit">
                    <h3 className="text-3xl text-start font-semibold mb-4">Tóm tắt đơn hàng</h3>
                    <div className="space-y-2 text-sm text-gray-700 mb-4">
                        <div className="flex justify-between">
                            <span>Tổng cộng</span>
                            <span>{subtotal.toFixed(0)} đ</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Phí vận chuyển</span>
                            <span>{delivery.toFixed(0)} đ</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Giảm giá</span>
                            <span>-</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Tổng tiền</span>
                            <span>{total.toFixed(0)} VND</span>
                        </div>
                    </div>
                    <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                        onClick={() => navigate(`/checkout`)}>
                        Thanh toán
                    </button>
                    <p className="text-sm text-blue-600 underline text-center mt-3 cursor-pointer">
                        Sử dụng mã giảm giá
                    </p>
                </div>
            </div>
        </>
    );
};

export default Cart;
