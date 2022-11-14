import React, { useState, useEffect, useContext } from 'react';
import { Typography, Descriptions, Divider } from 'antd';
import { getAllDatesBetweenDates, getRating } from '../../../Helper/Helper';
import moment from 'moment';

const ListingDescriptions = (props) => {
  const { data, bookings } = props;

  const { Title } = Typography;

  const getNumDaysBookedThisYear = (bookings) => {
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
      console.log(year, thisYear);
      return year === thisYear;
    });
    console.log(filteredDates);
    return filteredDates.length;
  };

  const numDaysBookedThisYear = getNumDaysBookedThisYear(bookings);
  const getProfitMadeThisYear = (bookings) => {
    const acceptedBookings = bookings.filter((booking) => booking.status === 'accepted');
    const numDaysAccepted = getNumDaysBookedThisYear(acceptedBookings);
    return numDaysAccepted * data.price;
  }
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
        <Descriptions.Item label="Has been online for">{`${onlineDays} days`}</Descriptions.Item>
        <Descriptions.Item label="Dates booked this year">
          {numDaysBookedThisYear}
        </Descriptions.Item>
        <Descriptions.Item label="Profits made this year">
          {`$${profitMadeThisYear}`}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ListingDescriptions;
