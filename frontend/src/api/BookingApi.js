import { postAxios, getAxios, deleteAxios, putAxios } from './Base';
import { baseUrl } from '../constants/Constants';

export const getBookings = async () => {
  try {
    const token = localStorage.getItem('token');
    const url = baseUrl + '/bookings';
    const headers = { Authorization: 'Bearer ' + token };
    const res = await getAxios(url, headers);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const postBookings = async (listingId, dateRange, totalPrice) => {
  try {
    const token = localStorage.getItem('token');
    const url = baseUrl + `/bookings/new/${listingId}`;
    const headers = { Authorization: 'Bearer ' + token };
    const data = {
      dateRange: dateRange,
      totalPrice: totalPrice,
    };
    const res = await postAxios(url, data, headers);
    console.log(res);
    return res;
  } catch (err) {
    return err;
  }
} 

export const putAcceptBookings = async (bookingId) => {
  try {
    const token = localStorage.getItem('token');
    const url = baseUrl + `/bookings/accept/${bookingId}`;
    const headers = { Authorization: 'Bearer ' + token };
    const res = await postAxios(url, {}, headers);
    console.log(res);
    return res;
  } catch (err) {
    return err;
  }
} 

export const putDeclineBookings = async (bookingId) => {
  try {
    const token = localStorage.getItem('token');
    const url = baseUrl + `/bookings/decline/${bookingId}`;
    const headers = { Authorization: 'Bearer ' + token };
    const res = await postAxios(url, {}, headers);
    console.log(res);
    return res;
  } catch (err) {
    return err;
  }
} 

export const deleteBookings = async (bookingId) => {
  try {
    const token = localStorage.getItem('token');
    const url = baseUrl + '/bookings/' + bookingId;
    const headers = { Authorization: 'Bearer ' + token };
    const res = await deleteAxios(url, {}, headers);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
} 