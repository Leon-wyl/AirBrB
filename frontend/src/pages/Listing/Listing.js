import React, { useState, useEffect, useContext } from 'react';
import { getListingWithId } from '../../api/ListingApi';
import ImageGallery from 'react-image-gallery';
import styles from './Listing.module.css';
import Gallery from 'react-photo-gallery';
import { Card, Typography, Rate, Button, Divider } from 'antd';
import { UserContext } from '../../store/UserContext';
import OtherDetails from './components/OtherDetails';
import Header from './components/Header';
import { getBookings } from '../../api/BookingApi';
import Bookings from './components/Bookings';
import OtherImages from './components/OtherImage';
import Reviews from './components/Reviews';

const Listing = () => {
  const [data, setData] = useState({});
  const [bookings, setBookings] = useState([]);

  const { userInfo } = useContext(UserContext);
  const loggedIn = !(userInfo.token === '');
  const isOwnListing = userInfo.email === data.owner;

  const acceptedBookings = bookings.filter(
    (booking) => booking.status === 'accepted'
  );
  const canReview = acceptedBookings.length !== 0;
  console.log(acceptedBookings);

  const getMyBookingRes = async (listingId) => {
    const bookingsRes = await getBookings();
    console.log(bookingsRes);
    const bookingDetails = bookingsRes ? bookingsRes?.data?.bookings : [];
    const myBookings = bookingDetails.filter(
      (booking) =>
        booking.listingId === listingId && booking.owner === userInfo.email
    );
    return myBookings;
  };

  useEffect(async () => {
    // Get the listing info, store in the useState
    const listingId = window.location.href.split('/')[4];
    const listingRes = await getListingWithId(listingId);
    const listingDetail = listingRes.data.listing;
    setData({ ...listingDetail, id: Number(listingId) });
    // If logged in, get booking info, store at useState
    if (loggedIn) {
      const myBookings = await getMyBookingRes(listingId);
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
        />
        <Divider />
        {loggedIn && !isOwnListing && <Bookings bookings={bookings} />}
        <OtherDetails data={data} />
        <Divider />
        <OtherImages data={data} />
        <Divider />
        <Reviews data={data} canReview={canReview} />
      </div>
    </div>
  );
};

export default Listing;
