import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegister } from '../../query/auth'; // Hook gọi API
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Form.css'
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });
    const [formErrors, setFormErrors] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const registerMutation = useRegister();



    // Regex giống với backend
    const usernameRegex = /^[a-zA-Z ]{3,24}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]{4,}@gmail\.com$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*_]{8,16}$/;

    const validateField = (name, value) => {
        let error = '';

        if (name === 'username') {
            if (!value.trim()) {
                error = 'Please insert password';
            } else if (!usernameRegex.test(value)) {
                error = 'Username must be 8-16 characters with uppercase, lowercase.';
            }
        }

        if (name === 'email') {
            if (!value.trim()) {
                error = 'Please insert email';
            } else if (!emailRegex.test(value)) {
                error = "Invalid email format. Email must be like 'abc@gmail.com'";
            }
        }

        if (name === 'password') {
            if (!value.trim()) {
                error = 'Please insert password';
            } else if (!passwordRegex.test(value)) {
                error = 'Password must be 8-16 characters with uppercase, lowercase, and number.';
            }
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Validate ngay khi nhập
        const error = validateField(name, value);

        setFormErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };



    const handleSignup = (e) => {
        e.preventDefault();

        setFormErrors({
            username: '',
            email: '',
            password: ''
        });

        const newErrors = {};
        let isValid = true;

        // Kiểm tra username
        if (!formData.username.trim()) {
            newErrors.username = 'Please insert username';
            isValid = false;
        } else if (!usernameRegex.test(formData.username)) {
            newErrors.username = 'Username must be 3-24 letters long and only contain letters and spaces.';
            isValid = false;
        }

        // Kiểm tra email
        if (!formData.email.trim()) {
            newErrors.email = 'Please insert email';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format. Email must be like 'abc@gmail.com'";
            isValid = false;
        }

        // Kiểm tra password
        if (!formData.password.trim()) {
            newErrors.password = 'Please insert password';
            isValid = false;
        }
        else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be 8-16 characters with uppercase, lowercase, and number.';
            isValid = false;
        }

        if (!isValid) {
            setFormErrors(newErrors);
            return;
        }

        // Gửi API nếu hợp lệ
        registerMutation.mutate(formData, {
            onSuccess: (data) => {
                toast.success('Register successfully!', {
                    position: 'top-right',
                    autoClose: 1500
                });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            },
            onError: (error) => {
                const fieldErrors = error.response?.data?.errors;
                if (fieldErrors) {
                    setFormErrors(prev => ({
                        ...prev,
                        ...fieldErrors
                    }));
                } else {
                    const msg = error.response?.data?.message || "Register failed!";
                    toast.error(msg, { autoClose: 2000 });
                }
            }
        });
    };



    return (
        <div className="signup">
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <ToastContainer />
                <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
                    <form onSubmit={handleSignup} className="space-y-4">

                        {/* Username */}
                        <div>
                            <label className="block font-medium mb-1">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`w-full border px-3 py-2 rounded outline-none ${formErrors.username ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Nhập tên của bạn"
                            />
                            {formErrors.username && <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block font-medium mb-1">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full border px-3 py-2 rounded outline-none ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="abc@gmail.com"
                            />
                            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block font-medium mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full border px-3 py-2 rounded pr-10 outline-none ${formErrors.password ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Nhập mật khẩu"
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                                </button>
                            </div>
                            {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
                        </div>

                        {/* Submit */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
                                disabled={registerMutation.isLoading}
                            >
                                {registerMutation.isLoading ? 'Registering...' : 'Register'}
                            </button>
                        </div>

                        <p className="text-center mt-3 text-sm text-gray-700">
                            Have an account?
                            <Link to="/login" className="text-green-600 hover:underline ml-1">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register
