import React, { useContext } from 'react';
import ImageGallery from 'react-image-gallery';
import styles from './Header.module.css';
import Gallery from 'react-photo-gallery';
import { Card, Typography, Rate, Button, Divider } from 'antd';
import { getRating } from '../../../Helper/Helper';
import { UserContext } from '../../../store/UserContext';
import { LockOutlined } from '@ant-design/icons';

const Header = (props) => {
  const { data } = props;

  const { Title, Text } = Typography;

  const { dateRange, userInfo } = useContext(UserContext);

  const numReviews = data?.reviews ? data.reviews.length : 0;
  const rating = data?.reviews ? getRating(data.reviews) : 0;

  const loggedIn = !(userInfo.token === '');
	console.log(userInfo.token)
  const price = data?.price ? data.price : 0;
  const stayLength = dateRange === 0 ? 1 : dateRange;
  const perStayOrPerNight = dateRange === 0 ? 'per night' : 'per stay';

  return (
    <div className={styles.header}>
      <Card
        hoverable={true}
        className={styles.card}
        style={{
          width: 300,
        }}
        cover={<img alt={`thumbnail-${data.id}`} src={data.thumbnail} />}
        onClick={() => history.push(`/listing/${data.id}`)}
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
        <Button size="large" type="primary" disabled={!loggedIn}>
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