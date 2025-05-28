/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import API_PATHS from '../../../constant/apiPath';
import { jwtDecode } from "jwt-decode"; // nhớ import nếu chưa có
import './Notification.css'
import '../../Custom/hover.css'

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const getUserId = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const decoded = jwtDecode(token);
        return decoded.userId || decoded.sub;
    };
    const userId = getUserId();

    // Get notification
    useEffect(() => {    
        if (!userId) return;
    
        axios.get(`${API_PATHS.noti}/noti/user/${userId}`)
            .then(response => {
                setUnreadNotifications(response.data);
            })
            .catch(error => {
                console.error("Error fetching notifications", error);
            });
    }, []);  // Chỉ gọi API khi component lần đầu được render

    // function open modal
    const handleBellClick = () => {
        setShowModal(true);
    };

    const handleRead = () => {
        console.log("Marking all notifications as read...");
        axios.put(`${API_PATHS.noti}/noti/user/${userId}/read`)  // Gửi yêu cầu API để đánh dấu tất cả thông báo là đã đọc
            .then(response => {
                // Sau khi đánh dấu tất cả thông báo là đã đọc, cập nhật lại danh sách thông báo
                setUnreadNotifications([]);  // Đặt lại danh sách thông báo chưa đọc (rỗng)
                setShowModal(false)
            })
            .catch(error => {
                console.error("Error marking notifications as read", error);
            });
    }


    return (
        <div className='notification'>
            <IoMdNotifications
                style={{ width: "25px", height: "25px" }}
                className="me-4 zoom-hover"
                onClick={handleBellClick}
            />
            <span>{unreadNotifications.length || 0}</span>

            {/* Modal hiển thị thông báo chưa đọc */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Notifications</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {unreadNotifications.length > 0 ? (
                        unreadNotifications.filter(notification => !notification.read)  // Lọc chỉ thông báo chưa đọc
                            .map((notification) => (
                                <div key={notification.id}>
                                    <p
                                        style={{ cursor: 'pointer' }}
                                        // onClick={() => handleNotificationClick(notification.id)}
                                    >
                                        {notification.message}
                                    </p>
                                </div>
                            ))
                    ) : (
                        <p>No unread notifications</p>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => handleRead()}>Mark as read</Button>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Notification;
