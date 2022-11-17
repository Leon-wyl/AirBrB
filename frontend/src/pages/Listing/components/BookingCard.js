import PropTypes from 'prop-types'
import { Button, Card, Typography } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import styles from '../Listing.module.css';
import DeleteModal from './DeleteModal';

const BookingCard = (props) => {
  const { data, setData, booking, getMyBookingRes, setBookings } = props;

  const { Text } = Typography;

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
            key="1"
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

BookingCard.propTypes = {
  booking: PropTypes.shape({
    dateRange: PropTypes.shape({
      end: PropTypes.string,
      start: PropTypes.string
    }),
    status: PropTypes.string,
    totalPrice: PropTypes.number
  }),
  data: PropTypes.object,
  getMyBookingRes: PropTypes.func,
  setBookings: PropTypes.func,
  setData: PropTypes.func
}

export default BookingCard;
