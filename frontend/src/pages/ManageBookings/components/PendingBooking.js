import { Button, Card, Descriptions } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from '../ManageBookings.module.css';
import AcceptModal from './AcceptModal';
import RejectModal from './RejectModal';

const PendingBooking = (props) => {
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
            key="1"
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
            key="2"
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
      </Card>
    </>
  );
};

PendingBooking.propTypes = {
  booking: PropTypes.shape({
    dateRange: PropTypes.shape({
      end: PropTypes.string,
      start: PropTypes.string,
    }),
    totalPrice: PropTypes.number,
  }),
  data: PropTypes.object,
  getListingBookings: PropTypes.func,
  setBookings: PropTypes.func,
};

export default PendingBooking;
