import React, { useState, useEffect, useContext } from 'react';
import { Typography, Descriptions, Divider } from 'antd';
import styles from './ManageBookings.module.css';
import { UserContext } from '../../store/UserContext';
import { getListingWithId } from '../../api/ListingApi';
import { getAllDatesBetweenDates, getRating } from '../../Helper/Helper';
import moment from 'moment';
import { getBookings } from '../../api/BookingApi';

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

  const getNumDaysBookedThisYear = () => {
		const thisYear = moment().year();
    const dateRanges = bookings.map((booking) => booking.dateRange);
    const allDatesWithDups = [];
    dateRanges.forEach((dateRange) => {
      const allDatesForRange = getAllDatesBetweenDates(
        moment(dateRange.start),
        moment(dateRange.end)
      );
			allDatesWithDups.push(...allDatesForRange);
    });
		const allDates = [...new Set(allDatesWithDups)];
		const filteredDates = allDates.filter((date) => {
			const year = Number(date.split('-')[0]);
			console.log(year, thisYear)
			return year === thisYear;
		})
		console.log(filteredDates)
		return filteredDates.length;
  };

	const numDaysBookedThisYear = getNumDaysBookedThisYear();

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

  const rating = getRating(data?.reviews ? data.reviews : []);
  const numReview = data?.reviews ? data.reviews.length : 0;
  const onlineDays = moment().diff(moment(data.postedOn), 'days');

  console.log(bookings);
  console.log(moment().year());
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.titleContainer}>
          <Title level={2}>{data?.title}</Title>
        </div>
        <Descriptions
          labelStyle={{ fontSize: '16px', fontWeight: 700 }}
          contentStyle={{ fontSize: '16px' }}
        >
          <Descriptions.Item label="Owner">{data?.owner}</Descriptions.Item>
          <Descriptions.Item label="Price per night">{`$${data.price} USD`}</Descriptions.Item>
          <Descriptions.Item label="Address">{`${data?.address?.addressLine}, ${data?.address?.city}, ${data?.address?.state}, ${data?.address?.country}`}</Descriptions.Item>
          <Descriptions.Item label="Published">
            {data?.published?.toString()}
          </Descriptions.Item>
          <Descriptions.Item label="Rating">{`${rating}/5`}</Descriptions.Item>
          <Descriptions.Item label="Number of Reviews">
            {numReview}
          </Descriptions.Item>
          <Descriptions.Item label="Has been online for">{`${onlineDays} days`}</Descriptions.Item>
					<Descriptions.Item label="Number of dates booked this year">{numDaysBookedThisYear}</Descriptions.Item>
        </Descriptions>
        <Divider />
      </div>
    </div>
  );
};

export default ManageBookings;
