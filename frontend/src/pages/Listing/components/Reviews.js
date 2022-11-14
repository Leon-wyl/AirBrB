import React, { useContext } from 'react';
import { Typography, Button, Divider } from 'antd';
import styles from '../Listing.module.css';
import { UserContext } from '../../../store/UserContext';

const Reviews = (props) => {
  const { Title, Text } = Typography;

  const { data, canReview } = props;

  return (
    <>
      <div className={styles.reviewHeader}>
        <Title level={2} style={{ display: 'inline' }}>
          Reviews
        </Title>
        <Button type="primary" size="large" disabled={!canReview}>
          Review
        </Button>
      </div>
      <div className={styles.container}>
        {data?.reviews?.length === 0 && (
          <Text style={{ fontSize: '16px' }}>No reviews posted</Text>
        )}
        {data?.reviews?.length > 0 &&
          data?.reviews.map((review) => (
            <Card style={{ width: '100%' }}>
              <Title level={5}>{review.user}</Title>
              <Text style={{ fontSize: '16px' }}>
                {review.time.format('DD/MM/YYYY')}
              </Text>
              <div>
                <Rate
                  size="small"
                  disabled
                  allowHalf
                  defaultValue={review.rating}
                />
                <Text type="primary"> {`(${review.rating})`}</Text>
              </div>
              <Divider />
              <Text style={{ fontSize: '16px' }}>{review.comment}</Text>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Reviews;
