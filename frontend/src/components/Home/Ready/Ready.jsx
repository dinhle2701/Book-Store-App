import React from 'react'
import { Image, Container, Button } from 'react-bootstrap'

const Ready = () => {
    return (
        <div className='ready text-start'>
            <div className="row g-0"> {/* g-0 để bỏ khoảng trắng giữa 2 cột */}
                <div className="col-12 col-md-6">
                    <Image
                        src={'https://online.maryville.edu/wp-content/uploads/sites/97/2019/05/public-health.jpg'}
                        width="100%"
                        className="me-2"
                    />
                </div>
                <div className="col-12 col-md-6 p-5 text-white" style={{ backgroundColor: "#025854d7" }}>
                    <Container className='p-5'>
                        <h2 className='my-5'>Ready to Start?</h2>
                        <p className='text-white mb-4' style={{ lineHeight: "2" }}>
                            Join thousands of satisfied practitioner and take <br />
                            your practice to the next level. Your perfect <br />
                            solution to support the entire client journey. <br />
                            All in one app.
                        </p>
                        <Button variant='success' style={{ backgroundColor: "rgb(4, 194, 1)" }}>
                            Take CPD Course
                        </Button>
                    </Container>
                </div>
            </div>
        </div>

    )
}

export default Ready
