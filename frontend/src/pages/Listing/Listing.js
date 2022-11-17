import { Divider, Typography, message } from 'antd';
import React, { useEffect, useState, useContext } from 'react';
import { getBookings } from '../../api/BookingApi';
import { getListingWithId } from '../../api/ListingApi';
import BookingCard from './components/BookingCard';
import Header from './components/Header';
import OtherDetails from './components/OtherDetails';
import OtherImages from './components/OtherImage';
import Reviews from './components/Reviews';
import styles from './Listing.module.css';
import { UserContext } from '../../store/UserContext';
import EmbeddedMap from './components/EmbeddedMap';

const Listing = () => {
  const { Title, Text } = Typography;

  const { token } = useContext(UserContext);
  const email = localStorage.getItem('email');

  const [data, setData] = useState({});
  const [bookings, setBookings] = useState([]);
  const dateRange = Number(window.location.href.split('/')[5]);

  const loggedIn = !(token === '');
  const isOwnListing = email === data.owner;

  const acceptedBookings = bookings.filter(
    (booking) => booking.status === 'accepted'
  );

  const getMyBookingRes = async (listingId, email, token) => {
    if (!token) return [];
    const res = await getBookings();
    if (res.status) {
      const bookingDetails = res ? res?.data?.bookings : [];
      const myBookings = bookingDetails.filter(
        (booking) =>
          booking.listingId === listingId.toString() && booking.owner === email
      );
      return myBookings;
    } else if (res.response.status === 403) {
      message.error('User is invalid. Please log in or sign up again');
      return [];
    } else {
      message.error('Something unexpected happened. Delete Unsuccessful');
      return [];
    }
  };

  useEffect(async () => {
    // Get the listing info, store in the useState
    const listingId = window.location.href.split('/')[4];
    const listingRes = await getListingWithId(listingId);
    const listingDetail = listingRes.data.listing;
    setData({ ...listingDetail, id: Number(listingId) });
    // If logged in, get booking info, store at useState
    if (loggedIn) {
      console.log(listingId);
      const myBookings = await getMyBookingRes(listingId, email, token);
      setBookings(myBookings);
    }
  }, []);

  console.log(data);
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <Header
          data={data}
          isOwnListing={isOwnListing}
          setData={setData}
          getMyBookingRes={getMyBookingRes}
          setBookings={setBookings}
          dateRange={dateRange}
        />
        <Divider />
        {loggedIn && !isOwnListing && (
          <div className={styles.BookingContainer}>
            <Title level={2}>Your Bookings</Title>
            {bookings.length === 0 && (
              <Text style={{ fontSize: '16px' }}>
                You haven&apos;t made any bookings on this listing
              </Text>
            )}
            <div className={styles.container}>
              {bookings.length > 0 &&
                bookings.map((booking, key) => (
                  <BookingCard
                    key={key}
                    data={data}
                    booking={booking}
                    setData={setData}
                    getMyBookingRes={getMyBookingRes}
                    setBookings={setBookings}
                  />
                ))}
            </div>
            <Divider />
          </div>
        )}
        <OtherDetails data={data} />
        <Divider />
        <OtherImages data={data} />
        <Divider />
        <EmbeddedMap data={data}/>
        <Divider />
        <Reviews
          data={data}
          acceptedBookings={acceptedBookings}
          setData={setData}
        />
      </div>
    </div>
  );
};

export default Listing;
