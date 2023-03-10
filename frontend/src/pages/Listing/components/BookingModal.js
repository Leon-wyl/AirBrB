import { DatePicker, message, Modal, Typography, Button } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { postBookings } from '../../../api/BookingApi';

const BookingModal = (props) => {
  const { isModalOpen, setIsModalOpen, data, getMyBookingRes, setBookings } =
    props;

  const { RangePicker } = DatePicker;
  const { Title } = Typography;

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const handleOk = async () => {
    if (dateRange.start && dateRange.end) {
      const days = dateRange.end.diff(dateRange.start, 'days');
      if (days === 0) {
        message.error('You cannot select the same starting and end dates');
      } else {
        const res = await postBookings(data.id, dateRange, days * data.price);
        if (res.status) {
          message.success('Create new booking successfully');
          console.log(data.id);
          const myBookings = await getMyBookingRes(data.id, email, token);
          setBookings(myBookings);
        } else if (res.response.status === 400) {
          console.log(res);
          message.error('Input of infomation of the new booking in invalid');
        } else if (res.response.status === 403) {
          message.error('User is invalid. Please log in or sign up again');
          history.push('/login');
        } else {
          message.error('Something unexpected happened.');
        }
        setIsModalOpen(false);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeDates = (date) => {
    date ? setDateRange({ start: date[0], end: date[1] }) : setDateRange({});
  };

  return (
    <div>
      <Modal
        title="Book Listing"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="1" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="2"
            name="bookSubmit"
            type="primary"
            onClick={handleOk}
          >
            OK
          </Button>,
        ]}
      >
        <Title level={5}>Select time range:</Title>
        <RangePicker
          disabledDate={(currentDate) =>
            currentDate <= moment().subtract(1, 'd')
          }
          onChange={onChangeDates}
        />
      </Modal>
    </div>
  );
};

BookingModal.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.number,
  }),
  getMyBookingRes: PropTypes.func,
  isModalOpen: PropTypes.bool,
  setBookings: PropTypes.func,
  setIsModalOpen: PropTypes.func,
};

export default BookingModal;
