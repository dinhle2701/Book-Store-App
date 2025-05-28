/* eslint-disable no-unused-vars */
import React from 'react';
import { Navbar, Container, Form, FormControl, Image, Button, Dropdown } from 'react-bootstrap';
import { useUser } from '../../../context/UserContext';
import { Link } from "react-router-dom";
import './CustomNavbar.css';
import '../../Custom/hover.css'
import Notification from '../Notification/Notification';
import { Home, ShoppingCart, Heart, Search } from "lucide-react";


const CustomNavbar = () => {
  const { user, setUser } = useUser(); // Dùng context

  const handleInformation = () => {
    window.location.href = '/infor';
  };


  const handleLogout = () => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
    if (confirmed) {
      localStorage.removeItem('token');
      setUser(null);
      window.location.href = '/';
    }
  };


  return (
    <Navbar expand="lg" className="shadow-sm py-2">
      <Container fluid className="px-3 px-md-5">
        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="navbarResponsive" />

        <Navbar.Brand href="/" className="text-success zoom-hover fw-semibold fs-4">
          <span className="fw-bold fs-3">B</span>ook Store
        </Navbar.Brand>

        <Navbar.Collapse id="navbarResponsive" className="justify-content-between">
          {/* Search */}
          <Form className="d-flex mx-auto w-100 w-md-50 my-2 my-md-0">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2 rounded-pill px-3"
              aria-label="Search"
            />
          </Form>

          {/* Right Section */}
          <div className="d-flex align-items-center gap-3 justify-content-end mt-2 mt-md-0">
            {/* <Notification /> */}

            <Link to="/" title="Home">
              <Home className="w-6 h-6" />
            </Link>
            <Link to="/favorites" title="Favourites">
              <Heart className="w-6 h-6" />
            </Link>
            <Link to="/cart" title="Cart">
              <ShoppingCart className="w-6 h-6" />
            </Link>

            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="div"
                  className="p-0 border-0 shadow-none"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={user.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
                      roundedCircle
                      width="40"
                      height="40"
                      className="me-2"
                    />
                    <div className="text-start d-none d-md-block">
                      <div className="fw-semibold text-dark">{user.iss || 'Username'}</div>
                      <div className="text-dark">{user.sub || 'User'}</div>
                    </div>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="mt-2">
                  <Dropdown.Item onClick={handleInformation}>Info</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                className="zoom-hover"
                variant="success"
                href="/login"
                style={{ background: 'rgb(4, 194, 1)', border: '0' }}
              >
                Login
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
