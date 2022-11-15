import React from 'react';
import { Modal, Typography, message } from 'antd';
import { putAcceptBookings } from '../../../api/BookingApi';

const AcceptModal = (props) => {
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
    const res = await putAcceptBookings(booking.id);
    if (res.status) {
      message.success('Accept booking successfully');
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
        title="Accept Booking"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Text style={{ fontSize: '16px' }}>
          Are you sure to accept this booking?
        </Text>
      </Modal>
    </>
  );
};

export default AcceptModal;
