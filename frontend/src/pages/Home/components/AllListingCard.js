import { Typography, Card, Rate } from 'antd';
import React from 'react';
import { getRating } from '../../../Helper/Helper';
import styles from '../../my-listings/components/MyListingCard.module.css';
import { useHistory } from 'react-router-dom';

const { Meta } = Card;

const AllListingCard = (props) => {
  const { data } = props;

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
        cover={<img alt={`thumbnail-${data.id}`} src={data.thumbnail} />}
        onClick={() => history.push(`/listing/${data.id}`)}
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

export default AllListingCard;
