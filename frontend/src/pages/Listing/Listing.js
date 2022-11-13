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
  const { Title, Text } = Typography;

  const [data, setData] = useState({});
  const [bookings, setBookings] = useState([]);

  const { userInfo } = useContext(UserContext);
  const loggedIn = !(userInfo.token === '');

  const acceptedBookings = bookings.filter(
    (booking) => booking.status === 'accepted'
  );
  console.log(acceptedBookings);
  const canReview = acceptedBookings.length !== 0;
  console.log(acceptedBookings);

  useEffect(async () => {
    // Get the listing info, store in the useState
    const listingId = window.location.href.split('/')[4];
    const listingRes = await getListingWithId(listingId);
    const listingDetail = listingRes.data.listing;
    setData(listingDetail);
    // If logged in, get booking info, store at useState
    if (loggedIn) {
      const bookingsRes = await getBookings();
      const bookingDetails = bookingsRes.data.bookings;
      const myBookings = bookingDetails.filter(
        (booking) =>
          booking.listingId === Number(listingId) &&
          booking.owner === userInfo.email
      );
      setBookings(myBookings);
    }
  }, []);

  // const thumbnail = [
  //   {
  //     src: data?.thumbnail,
  //   },
  // ];
  // const otherImages = data?.metadata?.imageGallery
  //   ? data?.metadata?.imageGallery?.map((dataUrl) => {
  //       return {
  //         src: dataUrl,
  //       };
  //     })
  //   : [];
  // const photos = thumbnail.concat(otherImages);

  // const thumbnail = [
  //   {
  //     original: data?.thumbnail,
  // 		thumbnail: data?.thumbnail,
  //   },
  // ];
  // const otherImages = data?.metadata?.imageGallery
  //   ? data?.metadata?.imageGallery?.map((dataUrl) => {
  //       return {
  //         original: dataUrl,
  // 				thumbnail: dataUrl,
  //       };
  //     })
  //   : [];
  // const photos = thumbnail.concat(otherImages);
  console.log(data);
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <Header data={data} />
        <Divider />
        {bookings.length !== 0 && <Bookings bookings={bookings} />}
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
