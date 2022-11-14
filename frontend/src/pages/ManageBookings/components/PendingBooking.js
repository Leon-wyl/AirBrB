import React, { useState } from 'react';
import { Typography, Card, Button, Descriptions } from 'antd';
import styles from '../ManageBookings.module.css';
import moment from 'moment';
import AcceptModal from './AcceptModal';
import RejectModal from './RejectModal';
import DeleteModal from '../../Listing/components/DeleteModal';

const PendingBooking = (props) => {
  const { Title, Text } = Typography;
  const { data, booking, getListingBookings, setBookings } = props;

  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  return (
    <>
      <AcceptModal
        isModalOpen={isAcceptModalOpen}
        setIsModalOpen={setIsAcceptModalOpen}
        getListingBookings={getListingBookings}
        setBookings={setBookings}
        booking={booking}
        data={data}
      />
      <RejectModal
        isModalOpen={isRejectModalOpen}
        setIsModalOpen={setIsRejectModalOpen}
        getListingBookings={getListingBookings}
        setBookings={setBookings}
        booking={booking}
        data={data}
      />
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
            onClick={() => setIsAcceptModalOpen(true)}
          >
            Accept
          </Button>,
          <Button
            style={{
              border: 'transparent',
              backgroundColor: 'transparent',
            }}
            size="small"
            onClick={() => setIsRejectModalOpen(true)}
          >
            Reject
          </Button>,
        ]}
      >
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
          <Descriptions.Item label="Total Price">
          {`$${booking.totalPrice} USD`}
          </Descriptions.Item>
        </Descriptions>
        {/* <Text
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
        >{`Total Price: $${booking.totalPrice} USD`}</Text> */}
      </Card>
    </>
  );
};

export default PendingBooking;
