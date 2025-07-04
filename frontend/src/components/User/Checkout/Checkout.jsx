/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useUser } from '../../../context/UserContext';
import { useCart } from '../../../context/CartContext';
import Breadcrumbs from '../../Custom/BreadCrums';
import { useCreateOrder } from '../../../query/order'; // ✅ IMPORT hàm tạo đơn hàng
import API_PATHS from '../../../constant/apiPath';

const Checkout = () => {
    const { user } = useUser();
    const { cartItems, clearCart } = useCart(); // ✅ clearCart nếu bạn đã có trong CartContext
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const { mutate: createOrder, isLoading } = useCreateOrder(); // ✅ React Query Mutation
    const fallbackImage = 'https://cdn2.iconfinder.com/data/icons/packing/80/shipping-34-512.png';

    const handleCheckout = (e) => {
        e.preventDefault();

        if (!address.trim()) {
            alert('Vui lòng nhập địa chỉ giao hàng.');
            return;
        }
        if (address.length > 256) {
            alert('Địa chỉ giao hàng không được vượt quá 300 ký tự.');
            return;
        }

        if (cartItems.length === 0) {
            alert('Giỏ hàng của bạn đang trống.');
            return;
        }

        if (!phone.trim()) {
            alert('Vui lòng nhập số điện thoại.');
            return;
        }

        const phoneRegex = /^0\d{9}$/; // Bắt đầu bằng 0, theo sau là 9 chữ số (tổng 10 số)

        if (!phoneRegex.test(phone)) {
            alert('Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số.');
            return;
        }



        const orderData = {
            name: user?.iss,
            email: user?.email,
            phone,
            address,
            cartItems,
            status: "Pending"
        };

        createOrder(orderData, {
            onSuccess: () => {
                alert('Đặt hàng thành công!');
                setAddress('');
                setPhone('')
                clearCart?.(); // ✅ reset giỏ hàng nếu bạn có hàm này
            },
            onError: (error) => {
                alert('Số lượng bạn đặt vượt quá số lượng kho');
                console.log(error)
                console.log(orderData)
            },
        });
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <div className="px-6 max-w-screen-xl mx-auto">
                <Breadcrumbs />
            </div>

            <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
                {/* LEFT: Thông tin thanh toán */}
                <div className="bg-white shadow-md rounded p-8">
                    <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

                    <form onSubmit={handleCheckout} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full name</label>
                            <input
                                type="text"
                                value={user?.iss || ''}
                                disabled
                                className="w-full mt-1 px-4 py-2 border rounded bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                disabled
                                className="w-full mt-1 px-4 py-2 border rounded bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone number</label>
                            <input
                                type="number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full mt-1 px-4 py-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your address..."
                                className="w-full mt-1 px-4 py-2 border rounded"
                                rows={3}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
                        >
                            {isLoading ? 'Đang xử lý...' : 'Checkout'}
                        </button>
                    </form>
                </div>

                {/* RIGHT: Thông tin sản phẩm trong giỏ */}
                <div className="bg-white shadow-md rounded p-8">
                    <h2 className="text-2xl font-semibold mb-4">Product in cart</h2>
                    {cartItems.length === 0 ? (
                        <p>Cart is empty</p>
                    ) : (
                        <ul className="divide-y divide-gray-200 space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.id} className="flex justify-between align-middle items-center py-2">
                                    <img
                                        src={item.img ? `${API_PATHS.img}/${item.img}` : 'https://cdn2.iconfinder.com/data/icons/packing/80/shipping-34-512.png'}
                                        alt={item.bookName}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = fallbackImage;
                                        }}
                                        width={'40px'} height={'40px'}
                                        className="object-cover text-center"
                                    />
                                    {/* <img
                                            src={`${API_PATHS.img}/${book.img}`}
                                            alt={book.bookName}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = fallbackImage;
                                            }}
                                            className="rounded-lg w-full h-64 object-cover mb-4 hover:cursor-pointer"
                                        /> */}
                                    <div className="w-80">
                                        <p className="font-medium text-sm truncate">{item.bookName}</p>
                                        <p className="text-sm text-gray-600">
                                            {item.quantity} x {item.price.toLocaleString()} ₫
                                        </p>
                                    </div>
                                    <p className="font-semibold text-right">
                                        {(item.price * item.quantity).toLocaleString()} ₫
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                    <hr className="my-4" />
                    <div className="text-lg font-bold text-right">
                        Total: {total.toLocaleString()} VND
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
