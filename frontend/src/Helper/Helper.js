import { message } from 'antd';
import { getAxios } from '../api/Base';
import { getBookings } from '../api/BookingApi';
import { getAllListings, getListingWithId } from '../api/ListingApi';
import { baseUrl } from '../constants/Constants';

export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  return false;
};

export const toRangeObject = (momentArray) => {
  return {
    start: momentArray[0],
    end: momentArray[1],
  };
};

// compare function for sorting
const compareNames = (a, b) => {
  const nameA = a.title.toLowerCase();
  const nameB = b.title.toLowerCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};

const compareIsMyBooking = (bookings) => (a, b) => {
  if (isMyBooking(a, bookings) === isMyBooking(b, bookings)) return 0;
  if (isMyBooking(a, bookings)) return -1;
  return 1;
};

const isMyBooking = (listing, bookings) => {
  const marker = false;
  bookings.filter((booking) => {
    if (listing.id === booking.listingId && userInfo.email === booking.owner)
      marker = true;
  });
  return marker;
};

export const getDaysBetweenDates = (startDate, endDate) => {
  const currDate = startDate.clone();
  const dates = [];

  while (currDate.isSameOrBefore(endDate)) {
    dates.push(currDate.format('YYYY-MM-DD'));
    currDate.add(1, 'days');
  }
  return dates;
};

export const getAllSortedUserDetails = async (userInfo) => {
  // get all user info, if cannot get then, print a message
  const listingsResRaw = await getAllListings();
  if (!listingsResRaw.status) {
    message('Something wrong happened, we cannot load the listings');
    return;
  }
  const listingsRes = listingsResRaw.data.listings;
  // Get all user details, append the result with user id
  const listingDetailsRaw = await getListingDetailFromIds(listingsRes);
  const listingDetails = [];
  for (let i = 0; i < listingDetailsRaw.length; i++) {
    listingDetails[i] = {
      ...listingDetailsRaw[i].data.listing,
      id: listingsRes[i].id,
    };
  }
  // Sort the result alphabetially, then put the listing(s) that is booked by the user in front of all other listings
  listingDetails.sort(compareNames);
  if (userInfo.token) {
    const bookingsResRaw = await getBookings();
    if (bookingsResRaw.status) {
      const bookings = bookingsResRaw.data.bookings;
      listingDetails.sort(compareIsMyBooking(bookings));
    }
  }
  return listingDetails;
};

export const getListingDetailFromIds = (listings) => {
  const userPromises = [];
  for (const listing of listings) {
    const url = baseUrl + '/listings/' + listing.id;
    userPromises.push(getAxios(url, {}));
  }
  return Promise.all(userPromises);
};

export const getRating = (reviews) => {
  const numRatings = reviews.length;
  return numRatings === 0
    ? 0
    : reviews.reduce((prev, curr) => prev.rating + curr.rating, 0) /
        numRatings;
};
