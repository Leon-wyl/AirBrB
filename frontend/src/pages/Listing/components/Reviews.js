import React from 'react';
import { Typography, Button } from 'antd';
import styles from '../Listing.module.css';

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
				{data?.reviews?.length > 0 && data?.reviews.map((review) => <Card></Card>)}
      </div>
    </>
  );
};

export default Reviews;
