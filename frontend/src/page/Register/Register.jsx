import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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

    const loginMutation = useRegister();



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
        loginMutation.mutate(formData, {
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
            <ToastContainer />
            <Container className='form-container d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
                <Row className="w-100">
                    <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                        <div className="form-control p-4">
                            <h2 className='text-center'>Register</h2>
                            <Form onSubmit={handleSignup}>


                                <Form.Group className='mb-3'>
                                    <Form.Label className='fw-bold'>Userame</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='username'
                                        placeholder="Enter your name"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                    {formErrors.username && <Form.Text className="text-danger">{formErrors.username}</Form.Text>}
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='fw-bold'>Email</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='email'
                                        placeholder="abc@gmail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {formErrors.email && <Form.Text className="text-danger">{formErrors.email}</Form.Text>}

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
                                        <Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback>
                                    </div>
                                </Form.Group>

                                <Form.Group className='mb-3 text-center'>
                                    <Button variant='success' className='w-50' type='submit'>Register</Button>
                                </Form.Group>

                                <Form.Group className='mb-3 text-center'>
                                    <span className='ms-3'>Have an account? <a className=' text-success' href="/login">Login</a> </span>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Register
