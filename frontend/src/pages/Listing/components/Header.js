import { Button, Card, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { getRating } from '../../../Helper/Helper';
import BookingModal from './BookingModal';
import styles from './Header.module.css';
import StarRatings from 'react-star-ratings';

const Header = (props) => {
  const { data, isOwnListing, getMyBookingRes, setBookings, dateRange } = props;

  const { Title, Text } = Typography;

  const token = localStorage.getItem('token');

  const numReviews = data?.reviews ? data.reviews.length : 0;
  const rating = data?.reviews ? getRating(data.reviews) : -1;

  const loggedIn = !(token === '');

  const price = data?.price ? data.price : 0;
  const stayLength = dateRange === 0 ? 1 : dateRange;
  const perStayOrPerNight = dateRange === 0 ? 'per night' : 'per stay';

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className={styles.header}>
      <BookingModal
        isModalOpen={isBookingModalOpen}
        setIsModalOpen={setIsBookingModalOpen}
        data={data}
        getMyBookingRes={getMyBookingRes}
        setBookings={setBookings}
      />
      <Card
        hoverable={true}
        className={styles.card}
        style={{
          width: 300,
          marginRight: '40px',
        }}
        cover={<img alt={`thumbnail-${data.id}`} src={data.thumbnail} />}
      ></Card>
      <div className={styles.headerInfo}>
        <div>
          <Title level={2} style={{ marginBottom: '5px' }}>
            {data.title}
          </Title>
          <Text
            style={{ display: 'inline', fontSize: '16px' }}
            type="primary"
            underline
          >{`${data?.address?.addressLine}, ${data?.address?.city}, ${data?.address?.state}, ${data?.address?.country}`}</Text>
        </div>
        <div className={styles.price}>
          <Title
            level={2}
            style={{ display: 'inline', marginRight: '5px' }}
            type="danger"
          >{`$${price * stayLength}`}</Title>
          <Text>{` USD ${perStayOrPerNight}`}</Text>
        </div>
        <div>
          <Button
            className={styles.bookBtn}
            size="large"
            type="primary"
            disabled={!loggedIn || isOwnListing}
            onClick={() => setIsBookingModalOpen(true)}
          >
            Book
          </Button>
          <div>
            {rating !== -1 && (
              <StarRatings
                rating={Number(rating)}
                starDimension="20px"
                starSpacing="1px"
                starRatedColor="gold"
              />
            )}
            <Text type="primary"> {`(${rating})`}</Text>
          </div>
          <Text
            style={{ display: 'inline', fontSize: '16px' }}
            type="primary"
            underline
          >
            {`Total reviews: ${numReviews}`}
          </Text>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  data: PropTypes.shape({
    address: PropTypes.shape({
      addressLine: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
      state: PropTypes.string,
    }),
    id: PropTypes.number,
    price: PropTypes.number,
    reviews: PropTypes.array,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }),
  getMyBookingRes: PropTypes.func,
  isOwnListing: PropTypes.bool,
  setBookings: PropTypes.func,
  dateRange: PropTypes.number,
};

export default Header;
