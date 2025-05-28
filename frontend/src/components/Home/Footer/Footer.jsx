/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Footer.css'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <div className='footer text-light' style={{ backgroundColor: '#025854' }}>
  <Container className='text-start p-5'>
    <Row className="gy-4">
      <Col md={4}>
        <h4 className="fw-bold text-white fs-3">
          <span className="text-success fw-semibold">M</span>ind Care.
        </h4>
        <p className="small">Best quality treatment <br /> and patient care by professionals</p>
        <p className="mt-3 mb-1">Follow socials</p>
        <div className="d-flex gap-3">
          <a href="#" className="text-white"><i className="bi bi-twitter-x fs-5"></i></a>
          <a href="#" className="text-white"><i className="bi bi-instagram fs-5"></i></a>
          <a href="#" className="text-white"><i className="bi bi-linkedin fs-5"></i></a>
        </div>
      </Col>

      <Col xs={6} md={2}>
        <h6 className="fs-5 mb-3 text-white">Company</h6>
        <ul className="list-unstyled">
          <li><a href="#" className="text-white text-decoration-none">About Us</a></li>
          <li><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
        </ul>
      </Col>

      <Col xs={6} md={3}>
        <h6 className="fs-5 mb-3 text-white">Patient</h6>
        <ul className="list-unstyled">
          <li><a href="#" className="text-white text-decoration-none">Find an Expert</a></li>
          <li><a href="#" className="text-white text-decoration-none">Check your symptoms</a></li>
        </ul>
      </Col>

      <Col xs={6} md={3}>
        <h6 className="fs-5 mb-3 text-white">Physios</h6>
        <ul className="list-unstyled">
          <li><a href="#" className="text-white text-decoration-none">Find Partner</a></li>
          <li><a href="#" className="text-white text-decoration-none">Blog</a></li>
        </ul>
      </Col>
    </Row>
  </Container>

  <div className='text-center border-top py-4 text-white'>
    <span>&copy; 2025 Dinhle. All rights reserved.</span>
  </div>
</div>

    )
}

export default Footer
