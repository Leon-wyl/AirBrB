import React, { useContext } from 'react';
import { Modal, Typography, message } from 'antd';
import { deleteBookings } from '../../../api/BookingApi';
import { UserContext } from '../../../store/UserContext';

const DeleteModal = (props) => {
  const {
    isModalOpen,
    setIsModalOpen,
    booking,
    getMyBookingRes,
    setBookings,
    data,
  } = props;

  const { Text } = Typography;

  const { userInfo } = useContext(UserContext);

  const handleOk = async () => {
    const res = await deleteBookings(booking.id);
    if (res.status) {
      message.success('Delete booking successfully');
      const myBookings = await getMyBookingRes(data.id, userInfo);
      setBookings(myBookings);
    } else if (res.response.status === 400) {
      console.log(res);
      message.error(res.response.data.error);
    } else if (res.response.status === 403) {
      message.error('User is invalid. Please log in or sign up again');
    } else {
      message.error('Something unexpected happened.');
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Delete Booking"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Text style={{ fontSize: '16px' }}>
          Are you sure to delete this booking?
        </Text>
      </Modal>
    </>
  );
};

export default DeleteModal;
