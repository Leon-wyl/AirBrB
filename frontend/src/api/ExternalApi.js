import { getAxios } from './Base';
import { GOOGLE_MAP_API_KEY, OPEN_WEATHER_API_KEY } from '../constants/Constants';

export const getGeoCoding = async (address) => {
  try {
    const url =
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      address +
      '&key=' +
      GOOGLE_MAP_API_KEY;
    const res = await getAxios(url);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getCurrentWeather = async (lat, lon) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`;
    const res = await getAxios(url);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
