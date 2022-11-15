import PropTypes from 'prop-types';
import React from 'react';
import styles from '../ManageBookings.module.css';
import { Typography, Card, Descriptions } from 'antd';
import moment from 'moment';

const BookingHistories = (props) => {
  const { bookings } = props;

  const { Title, Text } = Typography;

  const historicalBookings = bookings.filter(
    (booking) => booking.status !== 'pending'
  );

  return (
    <>
      <Title level={2}>Booking Histories</Title>
      {historicalBookings.length === 0 && (
        <Text style={{ fontSize: '16px' }}>No booking histories for now</Text>
      )}
      <div className={styles.container}>
        {historicalBookings.length > 0 &&
          historicalBookings.map((booking, key) => (
            <Card className={styles.card} key={key}>
              <Descriptions
                labelStyle={{ fontSize: '16px', fontWeight: 700 }}
                contentStyle={{ fontSize: '16px' }}
              >
                <Descriptions.Item label="Starts on">
                  {moment(booking.dateRange.start).format('DD/MM/YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Ends on">
                  {moment(booking.dateRange.end).format('DD/MM/YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Total price">
                  {`$${booking.totalPrice} USD`}
                </Descriptions.Item>
                <Descriptions.Item label="Booking status">
                  {booking.status}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          ))}
      </div>
    </>
  );
};

BookingHistories.propTypes = {
  bookings: PropTypes.shape({
    filter: PropTypes.func,
  }),
};

export default BookingHistories;
