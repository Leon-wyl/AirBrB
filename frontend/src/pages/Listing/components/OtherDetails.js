import React from 'react';
import { Divider, Typography, Card } from 'antd';
import styles from '../Listing.module.css';

const OtherDetails = (props) => {
  const { Title, Text } = Typography;

  const { data } = props;
  return (
    <>
      <div>
        <Title level={2} style={{ display: 'inline', marginRight: '20px' }}>
          Property Type
        </Title>
        <Text style={{ display: 'inline', fontSize: '16px' }}>
          {data?.metadata?.propertyType}
        </Text>
      </div>
      <Text
        style={{ fontSize: '16px', marginBottom: '10px', marginTop: '10px' }}
      >
        {`${data?.metadata?.numBedroom} Bedroom(s)`} &#x2022;{' '}
        {`${data?.metadata?.numBed} Bed(s)`} &#x2022;{' '}
        {`${data?.metadata?.numBathroom} Bathroom(s)`}
      </Text>
      <Text style={{ fontSize: '16px' }}>
        Room details: {data?.metadata?.bedroomDetails}
      </Text>
      <Divider />
      <Title level={2}>What this place offers</Title>
      <div className={styles.container}>
        {data?.metadata?.amenities.map((amenity, key) => (
          <Card key={key} size="small" className={styles.amenityCard}>
            <Text sytle={{ fontSize: '16px' }}>{amenity}</Text>
          </Card>
        ))}
      </div>
    </>
  );
};

export default OtherDetails;
