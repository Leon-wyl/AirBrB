import React, { useState } from 'react';
import { Modal, DatePicker, Typography, message } from 'antd';
import moment from 'moment';
import { postBookings } from '../../../api/BookingApi';

const BookingModal = (props) => {
  const { isModalOpen, setIsModalOpen, data, getMyBookingRes, setBookings } = props;
  console.log(data);
  const { RangePicker } = DatePicker;
  const { Title } = Typography;

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
          const myBookings = await getMyBookingRes(data.id);
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
        onOk={handleOk}
        onCancel={handleCancel}
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

export default BookingModal;
