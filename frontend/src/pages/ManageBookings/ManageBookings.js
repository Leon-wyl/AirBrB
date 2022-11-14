import React, { useState, useEffect, useContext } from 'react';
import { Typography, Descriptions, Divider } from 'antd';
import styles from './ManageBookings.module.css';
import { UserContext } from '../../store/UserContext';
import { getListingWithId } from '../../api/ListingApi';
import { getAllDatesBetweenDates, getRating } from '../../Helper/Helper';
import moment from 'moment';
import { getBookings } from '../../api/BookingApi';
import ListingDescriptions from './components/LisitingDescriptions';
import PendingBooking from './components/PendingBooking';
import BookingHistories from './components/BookingHistories';

const ManageBookings = () => {
  const { Title, Text } = Typography;

  const [data, setData] = useState({});
  const [bookings, setBookings] = useState([]);

  const getListingBookings = async (listingId) => {
    const allBookingRes = await getBookings();
    const allBookings = allBookingRes.data.bookings;
    const allBookingThisListing = allBookings.filter(
      (booking) => booking.listingId === listingId
    );
    return allBookingThisListing;
  };

  useEffect(async () => {
    // Get the listing info, store in the useState
    const listingId = window.location.href.split('/')[4];
    const listingRes = await getListingWithId(listingId);
    const listingDetail = listingRes.data.listing;
    setData({ ...listingDetail, id: Number(listingId) });
    // Get booking info, store at useState
    const myBookings = await getListingBookings(listingId);
    setBookings(myBookings);
  }, []);

  const pendingBookings = bookings.filter(
    (booking) => booking.status === 'pending'
  );

  console.log(bookings);
  console.log(moment().year());
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.titleContainer}>
          <Title level={2}>{data?.title}</Title>
        </div>
        <ListingDescriptions data={data} bookings={bookings} />
        <Divider />
        <Title level={2}>Pending Bookings</Title>
        {pendingBookings.length === 0 && (
          <Text style={{ fontSize: '16px' }}>
            No upcoming bookings to deal with for now
          </Text>
        )}
        <div className={styles.cardContainer}>
          {pendingBookings.length > 0 &&
            pendingBookings.map((booking, key) => (
              <PendingBooking
                key={key}
                data={data}
                booking={booking}
                getListingBookings={getListingBookings}
                setBookings={setBookings}
              />
            ))}
        </div>
        <Divider />
        <BookingHistories bookings={bookings} />
      </div>
    </div>
  );
};

export default ManageBookings;
