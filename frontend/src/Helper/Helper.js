import { message } from "antd";
import { getBookings } from "../api/BookingApi";
import { getAllListings, getListingWithId } from "../api/ListingApi";

export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  return false;
};

export const toRangeObject = (momentArray) => {
	return {
		start: momentArray[0],
		end: momentArray[1],
	}
}

// compare function for sorting
const compareNames = (a, b) => {
  const nameA = a.title.toLowerCase();
  const nameB = b.title.toLowerCase();
  console.log(nameA + " " + nameB)
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
  const currDate = startDate.clone()
  const dates = [];

  while (currDate.isSameOrBefore(endDate)) {
      dates.push(currDate.format('MM/DD/YYYY'));
      currDate.add(1, 'days');
  }
  return dates;
};

const getListingDetailFromIds = async (listings) => {
  const listingsDetails = [];
  for (const listing of listings) {
    const listingDetailRaw = await getListingWithId(listing.id);
    if (!listingDetailRaw.status) {
      // If cannot fetch user's listing, stop.
      message("Something wrong happened, we cannot load the listings.");
      return;
    }
    listingsDetails.push(listingDetailRaw.data.listing);
  }
  return listingsDetails;
};

export const getAllSortedUserDetails = async (userInfo) => {
  const listingsResRaw = await getAllListings();
  if (!listingsResRaw.status) {
    message("Something wrong happened, we cannot load the listings");
    return;
  }
  const listingsRes = listingsResRaw.data.listings;
  // Add metadata to listing results and sort listing alphabetically
  const listingDetails = await getListingDetailFromIds(listingsRes);
  listingDetails.sort(compareNames);
  // Put the listing(s) that is booked by the user in front of all other listings
  if (userInfo.token) {
    const bookingsResRaw = await getBookings();
    if (bookingsResRaw.status) {
      const bookings = bookingsResRaw.data.bookings;
      listingDetails.sort(compareIsMyBooking(bookings));
    }
  }
  return listingDetails;
}