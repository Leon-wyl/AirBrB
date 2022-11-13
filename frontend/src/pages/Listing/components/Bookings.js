import React from 'react';
import styles from '../Listing.module.css';
import { Card, Divider } from 'antd';

const Bookings = (props) => {
  const { bookings } = props;

  return (
    <div className={styles.container}>
      {bookings.map((booking, key) => (
        <Card size="small" key={key}>
          <Text
            style={{ fontSize: '16px' }}
          >{`Start On: ${booking.dateRange.start} End On: ${booking.dateRange.end}`}</Text>
          <Text
            style={{ fontSize: '16px' }}
          >{`Total Price: ${booking.totalPrice}`}</Text>
          <Text
            style={{ fontSize: '16px' }}
          >{`Status: ${booking.status}`}</Text>
        </Card>
      ))}
      <Divider />
    </div>
  );
};

export default Bookings;
