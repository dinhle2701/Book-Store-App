import React from 'react'
import { Container, Image } from 'react-bootstrap'
import './Stories.css'
const Stories = () => {
    return (
        <div className='stories bg-white p-5'>
            <Container>
                <div>
                    <h2 className='pt-2 fw-bold'>
                        Happy stories from friends <br />
                        who became <span style={{ color: "#10b715" }}>superheroes</span>
                    </h2>
                </div>

                <div className="row mt-5">
                    <div className="col-12 col-md-4 mb-4">
                        <div className="stories-block text-start p-5">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nobis, dolor velit itaque atque repudiandae distinctio?</p>
                            <div className="d-flex align-items-center">
                                <Image
                                    src={'https://randomuser.me/api/portraits/men/32.jpg'}
                                    roundedCircle
                                    width="40"
                                    height="40"
                                    className="me-2"
                                />
                                <div className="text-start">
                                    <div className="fw-semibold text-dark">{'User'}</div>
                                    <div className="fill-yellow-100 text-dark">{'User'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 mb-4">
                        <div className="stories-block text-start p-5">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nobis, dolor velit itaque atque repudiandae distinctio?</p>
                            <div className="d-flex align-items-center">
                                <Image
                                    src={'https://randomuser.me/api/portraits/men/32.jpg'}
                                    roundedCircle
                                    width="40"
                                    height="40"
                                    className="me-2"
                                />
                                <div className="text-start">
                                    <div className="fw-semibold text-dark">{'User'}</div>
                                    <div className="fill-yellow-100 text-dark">{'User'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 mb-4">
                        <div className="stories-block text-start p-5">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nobis, dolor velit itaque atque repudiandae distinctio?</p>
                            <div className="d-flex align-items-center">
                                <Image
                                    src={'https://randomuser.me/api/portraits/men/32.jpg'}
                                    roundedCircle
                                    width="40"
                                    height="40"
                                    className="me-2"
                                />
                                <div className="text-start">
                                    <div className="fw-semibold text-dark">{'User'}</div>
                                    <div className="fill-yellow-100 text-dark">{'User'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    )
}

export default Stories
