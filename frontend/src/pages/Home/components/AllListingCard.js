import PropTypes from 'prop-types';
import { Card, Rate, Typography } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { getRating } from '../../../Helper/Helper';
import styles from '../../my-listings/components/MyListingCard.module.css';

const { Meta } = Card;

const AllListingCard = (props) => {
  const { data, dateRange } = props;

  const { Text } = Typography;

  const history = useHistory();
  console.log(data?.reviews);
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
        cover={<img alt={`thumbnail-${data.id}`} src={data.thumbnail} />}
        onClick={() => history.push(`/listing/${data.id}/${dateRange}`)}
      >
        <Meta title={data.title} />
        <div className={styles.desContainer}>
          <Text className={styles.description} type="secondary">
            {`$${data.price} USD per night`}
          </Text>
          <div>
            <Rate size="small" disabled allowHalf defaultValue={rating} />
            <Text type="secondary"> {`(${rating})`}</Text>
          </div>
          <Text type="secondary"> {`(${numRatings} people rates)`}</Text>
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
};

export default AllListingCard;
