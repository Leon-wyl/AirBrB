import React, { useState } from 'react';
import styles from '../Listing.module.css';
import { Card, Typography, Button } from 'antd';
import DeleteModal from './DeleteModal';
import moment from 'moment';

const BookingCard = (props) => {
  const { data, setData, booking, getMyBookingRes, setBookings } = props;
  console.log(booking);
  const { Title, Text } = Typography;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <DeleteModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        getMyBookingRes={getMyBookingRes}
        setBookings={setBookings}
        booking={booking}
        setData={setData}
        data={data}
      />
      <Card
        size="small"
        className={styles.card}
        actions={[
          <Button
            style={{
              border: 'transparent',
              backgroundColor: 'transparent',
            }}
            size="small"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>,
        ]}
      >
        <Text
          style={{ fontSize: '16px', display: 'block' }}
        >{`Starts On: ${moment(booking.dateRange.start).format(
          'DD/MM/YYYY'
        )}`}</Text>
        <Text
          style={{ fontSize: '16px', display: 'block' }}
        >{`Ends On: ${moment(booking.dateRange.end).format(
          'DD/MM/YYYY'
        )}`}</Text>
        <Text
          style={{ fontSize: '16px', display: 'block' }}
        >{`Total Price: $${booking.totalPrice} USD`}</Text>
        <Text
          style={{ fontSize: '16px', display: 'block' }}
        >{`Status: ${booking.status}`}</Text>
      </Card>
    </>
  );
};

export default BookingCard;
