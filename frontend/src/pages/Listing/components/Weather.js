import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from 'antd';

const Weather = (props) => {
  const { data, weather } = props;
  const { Title, Text } = Typography;

  return (
    <>
      <Title level={2}>{`Current weather in ${data.address.city}`}</Title>
      <Text>{`Weather: ${weather.data.weather[0].description}`}</Text>
      <br />
      <Text>{`Max Temperature: ${(
        Number(weather.data.main.temp_max) - 273.15
      ).toFixed(2)} degree celcius`}</Text>
      <br />
      <Text>{`Min Temperature: ${(
        Number(weather.data.main.temp_min) - 273.15
      ).toFixed(2)} degree celcius`}</Text>
      <br />
      <Text>{`Humidity: ${Number(weather.data.main.humidity)}`}</Text>
    </>
  );
};

Weather.propTypes = {
  data: PropTypes.shape({
    address: PropTypes.shape({
      city: PropTypes.string,
    }),
  }),
  weather: PropTypes.shape({
    data: PropTypes.shape({
      main: PropTypes.shape({
        humidity: PropTypes.string,
        temp_max: PropTypes.string,
        temp_min: PropTypes.string,
      }),
      weather: PropTypes.any,
    }),
  }),
};

export default Weather;
