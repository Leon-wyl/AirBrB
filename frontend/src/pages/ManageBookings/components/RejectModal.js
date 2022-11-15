import PropTypes from 'prop-types';
import React from 'react';
import { Modal, Typography, message } from 'antd';
import { putDeclineBookings } from '../../../api/BookingApi';

const RejectModal = (props) => {
  const {
    isModalOpen,
    setIsModalOpen,
    booking,
    getListingBookings,
    setBookings,
    data,
  } = props;

  const { Text } = Typography;

  const handleOk = async () => {
    const res = await putDeclineBookings(booking.id);
    if (res.status) {
      message.success('Reject booking successfully');
      const myBookings = await getListingBookings(data.id);
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
        title="Reject Booking"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Text style={{ fontSize: '16px' }}>
          Are you sure to reject this booking?
        </Text>
      </Modal>
    </>
  );
};

RejectModal.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number,
  }),
  data: PropTypes.shape({
    id: PropTypes.number,
  }),
  getListingBookings: PropTypes.func,
  isModalOpen: PropTypes.func,
  setBookings: PropTypes.func,
  setIsModalOpen: PropTypes.func,
};

export default RejectModal;
