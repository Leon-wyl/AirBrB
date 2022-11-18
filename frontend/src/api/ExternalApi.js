import { getAxios } from './Base';
import { GOOGLE_MAP_API_KEY } from '../constants/Constants';

export const getGeoCoding = async (address) => {
  try {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + GOOGLE_MAP_API_KEY;
    const res = await getAxios(url);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
}
