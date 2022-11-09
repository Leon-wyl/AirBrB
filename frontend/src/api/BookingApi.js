import { postAxios, getAxios, deleteAxios, putAxios } from './Base';
import { baseUrl } from '../constants/Constants';

export const getBookings = async () => {
	try {
		const token = localStorage.getItem('token');
    const url = baseUrl + '/bookings';
		const headers = { Authorization: 'Bearer ' + token }
    const res = await getAxios(url, headers);
		console.log(res)
    return res;
  } catch (err) {
    console.log(err)
    return err;
  }
}