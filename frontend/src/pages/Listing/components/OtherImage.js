import PropTypes from 'prop-types';
import React from 'react';
import styles from '../Listing.module.css';
import { Card, Typography } from 'antd';

const OtherImages = (props) => {
  const { Title, Text } = Typography;

  const { data } = props;

  return (
    <>
      <Title level={2}>Other Images</Title>
      <div className={styles.container}>
        {data?.metadata?.imageGallery.length === 0 && (
          <Text style={{ fontSize: '16px' }}>No other images</Text>
        )}
        {data?.metadata?.imageGallery?.map((url, key) => (
          <Card
            className={styles.card}
            key={key}
            hoverable={true}
            cover={<img alt={`other-image-${data.title}-${key}`} src={url} />}
          />
        ))}
      </div>
    </>
  );
};

OtherImages.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    metadata: PropTypes.shape({
      imageGallery: PropTypes.array,
    }),
  }),
};

export default OtherImages;
