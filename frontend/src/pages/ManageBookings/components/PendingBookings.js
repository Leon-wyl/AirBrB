import React, { useState } from 'react';
import { Typography, Card, Button } from 'antd';
import styles from '../ManageBookings.module.css';
import moment from 'moment';

const PendingBookings = (props) => {
  const { Title, Text } = Typography;
  const { data, bookings, getListingBookings, setBookings } = props;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === 'pending'
  );

  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
	const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>	
      <Title level={2}>Pending Bookings</Title>
      {pendingBookings.length === 0 && (
        <Text style={{ fontSize: '16px' }}>
          No upcoming bookings to deal with for now
        </Text>
      )}
      <div className={styles.cardContainer}>
        {pendingBookings.length > 0 &&
          pendingBookings.map((booking) => (
            <Card
              hoverable={true}
              className={styles.card}
              actions={[
                <Button
                  style={{
                    border: 'transparent',
                    backgroundColor: 'transparent',
                  }}
                  size="small"
                  onClick={() => {}}
                >
                  Accept
                </Button>,
                <Button
                  style={{
                    border: 'transparent',
                    backgroundColor: 'transparent',
                  }}
                  size="small"
                  onClick={() => {}}
                >
                  Reject
                </Button>,
                <Button
                  style={{
                    border: 'transparent',
                    backgroundColor: 'transparent',
                  }}
                  size="small"
                  onClick={() => {}}
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
              >{`Total Price: ${booking.totalPrice}`}</Text>
            </Card>
          ))}
      </div>
    </>
  );
};

export default PendingBookings;
