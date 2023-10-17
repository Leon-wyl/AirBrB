import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import { Divider, Typography } from 'antd';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { GOOGLE_MAP_API_KEY } from '../../../constants/Constants';
import styles from '../Listing.module.css';
import { getGeoCoding } from '../../../api/ExternalApi';
import { UserContext } from '../../../store/UserContext';
// import Weather from './Weather';

const convertAddress = (addressLine, city, state) => {
  const linkedAddress = `${addressLine},+${city},+${state}`;
  return linkedAddress.replace(/\s+/g, '+');
};

const EmbeddedMap = (props) => {
  const { Title } = Typography;

  const { data } = props;

  const { isFetchedGoogle, setIsFetchedGoogle } = useContext(UserContext);

  const [geocode, setGeocode] = useState({ lat: 44, lng: -80 });
  // const [weather, setWeather] = useState(null);

  const fetchGeoCode = async (data) => {
    if (data.address && !isFetchedGoogle) {
      const address = convertAddress(
        data.address.addressLine,
        data.address.city,
        data.address.state
      );
      const res = await getGeoCoding(address);
      setIsFetchedGoogle(true);
      console.log(res);
      if (res?.data?.results && res?.data?.results !== []) {
        setGeocode(res.data.results[0]?.geometry?.location);
        // const lat = res.data.results[0]?.geometry?.location.lat;
        // const lng = res.data.results[0]?.geometry?.location.lng;
        // const weatherRes = await getCurrentWeather(lat, lng);
        // setWeather(weatherRes);
      }
    }
  };

  fetchGeoCode(data);

  useEffect(() => {
    setIsFetchedGoogle(false);
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <Title level={2}>Location</Title>
      <GoogleMap
        zoom={14}
        center={geocode}
        mapContainerClassName={styles.mapContainer}
      >
        <Marker position={geocode} />
      </GoogleMap>
      <Divider />
      {/* { weather && <Weather data={data} weather={weather} />} */}
    </div>
  );
};

EmbeddedMap.propTypes = {
  data: PropTypes.shape({
    address: PropTypes.shape({
      addressLine: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }),
  }),
};

export default EmbeddedMap;
