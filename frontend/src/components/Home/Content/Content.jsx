import React from 'react'
import { Image, Container, Button, Row, Col } from 'react-bootstrap'
import './Content.css'
import { FaStar } from "react-icons/fa";

const Content = () => {
    return (
        <div className="content-wrapper my-5">
            <Container>
                <Row className="align-items-center">
                    {/* Left content */}
                    <Col xs={12} md={6} className="text-start mb-4 mb-md-0">
                        <h1 className="fw-bold">Secure A Pain-Free Life With The Guidance Of Health Experts</h1>
                        <p className="my-4">
                            Reclaim your health. Overcome pain and limitations. <br />
                            Embrace a life without boundaries.
                        </p>
                        <Button className="mb-4 zoom-hover">Get Started</Button>

                        <div className="about-us d-flex align-items-center">
                            <div className="me-3">
                                <p className="d-flex align-items-center mb-1">
                                    <FaStar className="me-2" />
                                    <strong>About Us</strong>
                                </p>
                                <span className="text-warning d-flex">
                                    <FaStar className="me-1" />
                                    <FaStar className="me-1" />
                                    <FaStar className="me-1" />
                                    <FaStar className="me-1" />
                                    <FaStar />
                                </span>
                            </div>
                            <div>
                                <span className="d-flex align-items-center"><strong>5.0</strong></span>
                                <span>200 reviews</span>
                            </div>
                        </div>
                    </Col>

                    {/* Right image */}
                    <Col xs={12} md={6} className="text-center">
                        <Image
                            fluid
                            width="80%"
                            className="zoom-hover"
                            src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*"
                            alt="Doctor"
                        />
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default Content
