import React, { useState } from 'react';
import { Typography, Button, Divider, Card, Rate } from 'antd';
import styles from '../Listing.module.css';
import ReviewModal from './ReviewModal';
import moment from 'moment';

const Reviews = (props) => {
  const { Title, Text } = Typography;

  const { data, acceptedBookings, setData } = props;

  const canReview = acceptedBookings.length !== 0;

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <>
      <ReviewModal
        isModalOpen={isReviewModalOpen}
        setIsModalOpen={setIsReviewModalOpen}
        data={data}
        setData={setData}
        acceptedBookings={acceptedBookings}
      />
      <div className={styles.reviewHeader}>
        <Title level={2} style={{ display: 'inline' }}>
          Reviews
        </Title>
        <Button
          type="primary"
          disabled={!canReview}
          onClick={() => setIsReviewModalOpen(true)}
        >
          Add an review
        </Button>
      </div>
      <div className={styles.container}>
        {data?.reviews?.length === 0 && (
          <Text style={{ fontSize: '16px' }}>No reviews posted</Text>
        )}
        {data?.reviews?.length > 0 &&
          data?.reviews.map((review, key) => (
            <Card style={{ width: '100%' }} key={key} className={styles.card}>
              <Title
                level={4}
                style={{
                  fontSize: '16px',
                  display: 'inline',
                  marginRight: '20px',
                }}
              >
                {review.user}
              </Title>
              <Text style={{ fontSize: '16px', display: 'inline' }}>
                {`Rated on ${moment(review.time).format('DD/MM/YYYY')}`}
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
