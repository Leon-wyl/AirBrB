import { message, Modal, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { deleteBookings } from '../../../api/BookingApi';

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

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  const handleOk = async () => {
    const res = await deleteBookings(booking.id);
    if (res.status) {
      message.success('Delete booking successfully');
      const myBookings = await getMyBookingRes(data.id, email, token);
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

DeleteModal.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number,
  }),
  data: PropTypes.shape({
    id: PropTypes.number,
  }),
  getMyBookingRes: PropTypes.func,
  isModalOpen: PropTypes.func,
  setBookings: PropTypes.func,
  setIsModalOpen: PropTypes.func,
};

export default DeleteModal;
