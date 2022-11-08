import { postAxios, getAxios, deleteAxios, putAxios } from './Base';
import { baseUrl } from '../constants/Constants';

export const getAllListings = async () => {
  try {
    const url = baseUrl + '/listings';
    const res = await getAxios(url);
    // console.log(res)
    return res;
  } catch (err) {
    console.log(err)
    return err;
  }
}

export const getListingWithId = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const url = baseUrl + '/listings/' + id;
    const headers = { Authorization: 'Bearer ' + token }
    const res = await getAxios(url, {}, headers);
    // console.log(res)
    return res;
  } catch (err) {
    console.log(err)
    return err;
  }
}

export const postNewListing = async (title, address, price, thumbnail, metadata) => {
	try {
    console.log(title, address, price, thumbnail, metadata)
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
    const res = await postAxios(url, data, headers);
    return res;
  } catch (err) {
    console.log(err)
    return err;
  }
}

export const deleteListing = async (id) => {
	try {
    const token = localStorage.getItem('token');
    console.log(token);
    const url = baseUrl + '/listings/' + id;
    const headers = { Authorization: 'Bearer ' + token }
    const res = await deleteAxios(url, {}, headers);
    return res;
  } catch (err) {
    console.log(err)
    return err;
  }
}

export const putListing = async (id, title, address, price, thumbnail, metadata) => {
	try {
    const token = localStorage.getItem('token');
    const url = baseUrl + '/listings/' + id;
    const headers = { Authorization: 'Bearer ' + token }
		const data = { 
			title: title,
			address: address,
			price: price,
			thumbnail: thumbnail,
			metadata: metadata,
		}
    const res = await putAxios(url, data, headers);
    return res;
  } catch (err) {
    console.log(err)
    return err;
  }
}

export const putPublishListing = async (id, availability) => {
	try {
    const token = localStorage.getItem('token');
    const url = baseUrl + '/listings/publish/' + id;
    const headers = { Authorization: 'Bearer ' + token }
		const data = { 
			availability: availability
		}
    const res = await putAxios(url, data, headers);
    return res;
  } catch (err) {
    console.log(err)
    return err;
  }
}

export const putUnpublishListing = async (id) => {
	try {
    const token = localStorage.getItem('token');
    const url = baseUrl + '/listings/unpublish/' + id;
    const headers = { Authorization: 'Bearer ' + token }
    const res = await putAxios(url, {}, headers);
    return res;
  } catch (err) {
    console.log(err)
    return err;
  }
}