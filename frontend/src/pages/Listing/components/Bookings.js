import React, { useState } from 'react';
import styles from '../Listing.module.css';
import { Card, Divider, Typography } from 'antd';
import moment from 'moment';

const Bookings = (props) => {
  const { bookings } = props;
  console.log(bookings);
  const { Title, Text } = Typography;

  return (
    <div className={styles.BookingContainer}>
      <Title level={2}>Your Bookings</Title>
      {bookings.length == 0 && (
        <Text style={{ fontSize: '16px' }}>
          You haven't made any bookings on this listing
        </Text>
      )}
      <div className={styles.container}>
        {bookings.length > 0 &&
          bookings.map((booking, key) => (
            <Card size="small" key={key} className={styles.card}>
              <Text style={{ fontSize: '16px', display: 'block' }}>{`Starts On: ${moment(
                booking.dateRange.start
              ).format('DD/MM/YYYY')}`}</Text>
							 <Text style={{ fontSize: '16px', display: 'block' }}>{`Ends On: ${moment(
                booking.dateRange.end
              ).format('DD/MM/YYYY')}`}</Text>
              <Text
                style={{ fontSize: '16px', display: 'block' }}
              >{`Total Price: ${booking.totalPrice}`}</Text>
              <Text
                style={{ fontSize: '16px', display: 'block'  }}
              >{`Status: ${booking.status}`}</Text>
            </Card>
          ))}
      </div>
      <Divider />
    </div>
  );
};

export default Bookings;
