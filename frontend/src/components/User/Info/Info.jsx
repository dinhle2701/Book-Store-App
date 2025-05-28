import React from 'react';
import { useUser } from '../../../context/UserContext'; // path đúng
import { Table, Image, Container, Form, Row, Col } from 'react-bootstrap'
import './Info.css'

const Info = () => {
    const { user } = useUser();

    if (!user) {
        return <p>Loading user information...</p>;
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log('Selected file:', file);
        // Bạn có thể upload lên server hoặc lưu vào state
    };


    return (
        <div className="info mt-4">
            <h2 className="mb-4 text-center"><strong>USER INFORMATION</strong></h2>
            <Container className="py-5 info-container">
                <Row className="align-items-center">
                    <Col xs={12} md={5} lg={4} className="text-center text-md-center mb-4 mb-md-0">
                        <Image
                            src={user.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
                            roundedCircle
                            className="shadow img-fluid"
                            style={{ minWidth: '200px', height: 'auto' }}
                        />
                        <Form.Group controlId="formFile" className="mt-3 d-flex justify-content-center">
                            <Form.Control
                                className="w-100 w-md-75"
                                type="file"
                                onChange={handleFileChange}
                                placeholder="Choose avatar"
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={7} lg={8}>
                        <h3 className="mb-4 text-secondary text-center text-md-start">{user.iss || 'Unknown'}</h3>
                        <Table hover responsive className="text-start">
                            <tbody>
                                <tr>
                                    <th>Email:</th>
                                    <td>{user.email || 'Unknown'}</td>
                                </tr>
                                <tr>
                                    <th>Role:</th>
                                    <td>{user.role || 'Unknown'}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>


            </Container>
        </div>

    );
};

export default Info;
