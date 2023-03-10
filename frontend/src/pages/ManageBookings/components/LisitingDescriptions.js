import { Descriptions, Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { getAllDatesBetweenDates, getRating } from '../../../Helper/Helper';

const ListingDescriptions = (props) => {
  const { data, bookings } = props;

  const { Title } = Typography;

  const getNumDaysBookedThisYear = (bookings) => {
    const thisYear = moment().year();
    // get all accepted booking ranges, get the date,
    // then put them into array and remove dups, then get the date of this year
    const acceptedBookings = bookings.filter((booking) => (booking.status === 'accepted'));
    const dateRanges = acceptedBookings.map((booking) => booking.dateRange);
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
      return year === thisYear;
    });
    return filteredDates.length;
  };

  const numDaysBookedThisYear = getNumDaysBookedThisYear(bookings);

  const getNumberOfBookingsThisYear = (bookings) => {
    const thisYear = moment().year();
    // Get all accepted booking ranges, then filter out the ranges
    const acceptedBookings = bookings.filter((booking) => (booking.status === 'accepted'));
    const dateRanges = acceptedBookings.map((booking) => booking.dateRange);
    const dateRangesThisYear = dateRanges.filter((dateRange) => {
      const year = Number(dateRange.start.split('-')[0]);
      console.log(year, thisYear)
      return year === thisYear;
    })
    return dateRangesThisYear.length;
  }

  const getProfitMadeThisYear = (bookings) => {
    const acceptedBookings = bookings.filter(
      (booking) => booking.status === 'accepted'
    );
    // every period earns price * (dates - 1) dolloars, that's why number of
    // booking need to be subtract
    const numAcceptedBookings = getNumberOfBookingsThisYear(bookings);
    const numDaysAccepted = getNumDaysBookedThisYear(acceptedBookings);
    return (numDaysAccepted - numAcceptedBookings) * data.price;
  };

  const profitMadeThisYear = getProfitMadeThisYear(bookings);

  const rating = getRating(data?.reviews ? data.reviews : []);
  const numReview = data?.reviews ? data.reviews.length : 0;
  const onlineDays = moment().diff(moment(data.postedOn), 'days');

  return (
    <div>
      <Title level={2}>Listing infomation</Title>
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
        <Descriptions.Item label="Been online for">{`${onlineDays} days`}</Descriptions.Item>
        <Descriptions.Item label="Days booked this year">
          {numDaysBookedThisYear}
        </Descriptions.Item>
        <Descriptions.Item label="Profits this year">
          {`$${profitMadeThisYear}`}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

ListingDescriptions.propTypes = {
  bookings: PropTypes.array,
  data: PropTypes.shape({
    address: PropTypes.shape({
      addressLine: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
      state: PropTypes.string,
    }),
    owner: PropTypes.string,
    postedOn: PropTypes.string,
    price: PropTypes.number,
    published: PropTypes.bool,
    reviews: PropTypes.array,
  }),
};

export default ListingDescriptions;
