import React, { useState, useContext } from 'react';
import styles from './Header.module.css';
import { Card, Typography, Rate, Button, Divider } from 'antd';
import { getRating } from '../../../Helper/Helper';
import { UserContext } from '../../../store/UserContext';
import BookingModal from './BookingModal';

const Header = (props) => {
  const { data, isOwnListing, getMyBookingRes, setBookings } = props;

  const { Title, Text } = Typography;

  const { dateRange, userInfo } = useContext(UserContext);

  const numReviews = data?.reviews ? data.reviews.length : 0;
  const rating = data?.reviews ? getRating(data.reviews) : 0;

  const loggedIn = !(userInfo.token === '');

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
        }}
        cover={<img alt={`thumbnail-${data.id}`} src={data.thumbnail} />}
      ></Card>
      <div className={styles.headerInfo}>
        <Title level={2} style={{ marginBottom: '5px' }}>
          {data.title}
        </Title>
        <Text
          style={{ display: 'inline', fontSize: '16px' }}
          type="primary"
          underline
        >{`${data?.address?.addressLine}, ${data?.address?.city}, ${data?.address?.state}, ${data?.address?.country}`}</Text>
        <div>
          <Title level={2} style={{ display: 'inline' }}>{`$${
            price * stayLength
          }`}</Title>
          <Text>{` USD ${perStayOrPerNight}`}</Text>
        </div>
        <Button
          size="large"
          type="primary"
          disabled={!loggedIn || isOwnListing}
					onClick={() => setIsBookingModalOpen(true)}
        >
          Book
        </Button>
        <div>
          <Rate size="small" disabled allowHalf defaultValue={rating} />
          <Text type="primary"> {`(${rating})`}</Text>
        </div>
        <Text
          style={{ display: 'inline', fontSize: '16px' }}
          type="primary"
          underline
        >
          {`${numReviews}`} people reviewed
        </Text>
      </div>
    </div>
  );
};

export default Header;