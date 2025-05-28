import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../query/auth'; // Hook gọi API
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../../context/UserContext'; // đúng path tới UserContext
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useUser(); // lấy hàm setUser từ context

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const loginMutation = useLogin();

    const emailRegex = /^[a-zA-Z0-9._%+-]{4,}@gmail\.com$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*_]{8,24}$/;

    const validateField = (name, value) => {
        let error = '';

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
                error = 'Password must be 8-24 characters with uppercase, lowercase, and number.';
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

    const handleLogin = (e) => {
        e.preventDefault();

        // Validate toàn bộ form trước khi submit
        const errors = {
            email: validateField('email', formData.email),
            password: validateField('password', formData.password)
        };

        setFormErrors(errors);

        // Nếu còn lỗi, không submit
        if (errors.email || errors.password) {
            return;
        }

        // Gọi API
        loginMutation.mutate(formData, {
            onSuccess: (data) => {
                localStorage.setItem('token', data.token);
                const decodedToken = jwtDecode(data.token);
                const role = decodedToken.role;
                setUser(decodedToken);

                toast.success('Login Successful!', {
                    position: 'top-right',
                    autoClose: 500
                });

                setTimeout(() => {
                    if (role === 'Admin') {
                        navigate('/admin');
                    } else if (role === 'User') {
                        navigate('/');
                    } else {
                        navigate('/user');
                    }
                }, 1500);
            },
            onError: (error) => {
                const errorMessage = error.response?.data?.message || "Something went wrong";
                const msg = errorMessage.toLowerCase();

                setFormErrors({
                    email: '',
                    password: ''
                });

                if (error.response?.status === 401 || error.response?.status === 404) {
                    if (msg.includes('email') || msg.includes('tài khoản')) {
                        setFormErrors(prev => ({ ...prev, email: errorMessage }));
                    } else if (msg.includes('password') || msg.includes('mật khẩu')) {
                        setFormErrors(prev => ({ ...prev, password: errorMessage }));
                    } else {
                        setFormErrors(prev => ({ ...prev, email: errorMessage }));
                    }
                } else {
                    toast.error("Unable Connect to Server", { autoClose: 1500 });
                }
            }
        });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signin">
            <ToastContainer />
            <Container className="form-container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <Row className="w-100">
                    <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                        <div className="form-control p-4">
                            <h2 className="text-center">Login</h2>
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder="abc@gmail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        isInvalid={!!formErrors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">Password</Form.Label>
                                    <div className="input-group">
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            isInvalid={!!formErrors.password}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={toggleShowPassword}
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                                        </button>
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.password}
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3 text-center">
                                    <Button variant='success' className="w-50" type="submit" disabled={loginMutation.isLoading}>
                                        {loginMutation.isLoading ? 'Logging in...' : 'Login'}
                                    </Button>
                                </Form.Group>

                                <Form.Group className="mb-3 text-center">
                                    <span className="ms-3">
                                        <a href="/register" className='text-success'>Register</a>
                                    </span>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
