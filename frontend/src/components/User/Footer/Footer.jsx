/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
    Facebook,
    Twitter,
    Instagram,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-200 pt-10 mt-10 text-left">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Logo & Description */}
                <div>
                    <h2 className="text-2xl font-bold mb-3">BookShop</h2>
                    <p className="text-sm">
                        Delivering an exceptional shopping experience with top-notch service quality.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/products" className="hover:underline">Products</a></li>
                        <li><a href="/about" className="hover:underline">About Us</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/faq" className="hover:underline">FAQs</a></li>
                        <li><a href="/policy" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="/shipping" className="hover:underline">Shipping Policy</a></li>
                        <li><a href="/return" className="hover:underline">Return Policy</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Contact</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                            <Mail size={16} /> contact@myshop.com
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone size={16} /> 0901 234 567
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin size={16} /> 123 Le Loi Street, District 1, Ho Chi Minh City
                        </li>
                    </ul>
                    <div className="flex mt-4 space-x-4 text-gray-400">
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Instagram size={20} /></a>
                        <a href="#"><Twitter size={20} /></a>
                    </div>
                </div>
            </div>

            <div className="mt-10 border-t py-5 border-gray-700 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} MyShop. All rights reserved.
            </div>
        </footer>

    );
};

export default Footer;
