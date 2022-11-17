import PropTypes from 'prop-types';
import { Card, Typography } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { getRating } from '../../../Helper/Helper';
import styles from '../../my-listings/components/MyListingCard.module.css';
import StarRatings from 'react-star-ratings';

const { Meta } = Card;

const AllListingCard = (props) => {
  const { data, dateRange } = props;

  const { Text } = Typography;

  const history = useHistory();

  const numRatings = data.reviews.length;
  const rating = getRating(data.reviews);

  return (
    <>
      <Card
        hoverable={true}
        className={styles.card}
        style={{
          width: 300,
        }}
        cover={<img alt={`thumbnail-${data.title}`} src={data.thumbnail} />}
        onClick={() => history.push(`/listing/${data.id}/${dateRange}`)}
      >
        <Meta title={data.title} />
        <div className={styles.desContainer}>
          <Text className={styles.description} type="secondary">
            {`$${data.price} USD per night`}
          </Text>
          <div>
            <StarRatings
              rating={Number(rating)}
              starDimension="20px"
              starSpacing="1px"
              starRatedColor="gold"
            />
            <Text type="secondary"> {`(${Number(rating).toFixed(2)})`}</Text>
          </div>
          <Text type="secondary"> {`Total reviews: ${numRatings}`}</Text>
        </div>
      </Card>
    </>
  );
};

AllListingCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.number,
    reviews: PropTypes.array,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }),
  dateRange: PropTypes.number,
  keyNumber: PropTypes.number,
};

export default AllListingCard;
