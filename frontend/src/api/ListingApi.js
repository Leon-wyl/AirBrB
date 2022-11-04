import { postAxios, getAxios } from './Base';
import { baseUrl } from '../constants/Constants';

export const getAllListings = async () => {
  try {
    const url = baseUrl + '/listings';
    const res = await getAxios(url);
    console.log(res)
    return res;
  } catch (err) {
    console.log(err)
    return err;
  }
}

export const getListingsWithId = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const url = baseUrl + '/listings' + id;
    const headers = { Authorization: 'Bearer ' + token }
    const res = await getAxios(url, {}, headers);
    console.log(res)
    return res;
  } catch (err) {
    console.log(err)
    return err;
  }
}

export const postNewListings = async (title, address, price, thumbnail, metadata) => {
	try {
    const token = localStorage.getItem('token');
    const url = baseUrl + '/listings/new';
    const headers = { Authorization: 'Bearer ' + token }
		const data = { 
			title: title,
			address: address,
			price: price,
			thumbnail: thumbnail,
			metadata: metadata,
		}
    const res = await getAxios(url, data, headers);
    console.log(res)
    return res;
  } catch (err) {
    console.log(err)
    return err;
  }
}