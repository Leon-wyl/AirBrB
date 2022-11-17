import PropTypes from 'prop-types';
import { Typography, Card, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styles from './MyListingCard.module.css';
import DeleteModal from './DeleteModal';
import { useHistory } from 'react-router-dom';
import PublishModal from './PublishModal';
import UnpublishModal from './UnpublishModal';
import { getRating } from '../../../Helper/Helper';
import StarRatings from 'react-star-ratings';

const { Meta } = Card;

const MyListingCard = (props) => {
  const { data, setListings } = props;
  const { Text } = Typography;

  const history = useHistory();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isUnpublishModalOpen, setIsUnpublishModalOpen] = useState(false);

  const numRatings = data.reviews.length;
  const rating = getRating(data.reviews);

  return (
    <>
      <DeleteModal
        setListings={setListings}
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        listingId={data.id}
      />
      <PublishModal
        setListings={setListings}
        isModalOpen={isPublishModalOpen}
        setIsModalOpen={setIsPublishModalOpen}
        listingId={data.id}
      />
      <UnpublishModal
        setListings={setListings}
        isModalOpen={isUnpublishModalOpen}
        setIsModalOpen={setIsUnpublishModalOpen}
        listingId={data.id}
      />
      <Card
        hoverable={true}
        className={styles.card}
        style={{
          width: 300,
        }}
        cover={<img alt={`thumbnail-${data.id}`} src={data.thumbnail} />}
        actions={[
          <Button
            key="1"
            name='publishBtn'
            style={{ border: 'transparent', backgroundColor: 'transparent' }}
            size="small"
            onClick={() =>
              data.published
                ? setIsUnpublishModalOpen(true)
                : setIsPublishModalOpen(true)
            }
          >
            {data.published ? 'Unpublish' : 'Publish'}
          </Button>,
          <Button
            key="2"
            style={{ border: 'transparent', backgroundColor: 'transparent' }}
            size="small"
            onClick={() => history.push(`/bookings/${data.id}`)}
          >
            Bookings
          </Button>,
          <Button
            key="3"
            name='editBtn'
            style={{ border: 'transparent', backgroundColor: 'transparent' }}
            size="small"
            onClick={() => history.push(`/editlisting/${data.id}`)}
          >
            Edit
          </Button>,
          <DeleteOutlined key="4" onClick={() => setIsDeleteModalOpen(true)} />,
        ]}
      >
        <Meta title={data.title} />
        <div className={styles.desContainer}>
          <Text name="price" className={styles.description} type="secondary">
            Price: {`$${data.price}`}
          </Text>
          <Text
            name="propertyType"
            className={styles.description}
            type="secondary"
          >
            Property Type: {`${data.metadata.propertyType}`}
          </Text>
          <Text name="numBed" className={styles.description} type="secondary">
            Beds: {`${data.metadata.numBed}`}
          </Text>
          <Text
            name="numBathroom"
            className={styles.description}
            type="secondary"
          >
            Bathrooms: {`${data.metadata.numBathroom}`}
          </Text>
          <div>
            <StarRatings
              rating={Number(rating)}
              starDimension="20px"
              starSpacing="1px"
              starRatedColor="gold"
            />
            <Text name="rating" type="secondary">
              {' '}
              {`(${rating})`}
            </Text>
          </div>
          <Text
            name="numRating"
            className={styles.description}
            type="secondary"
          >
            Total reviews: {`${numRatings}`}
          </Text>
        </div>
      </Card>
    </>
  );
};

MyListingCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    metadata: PropTypes.shape({
      numBathroom: PropTypes.number,
      numBed: PropTypes.number,
      propertyType: PropTypes.string,
    }),
    price: PropTypes.number,
    published: PropTypes.bool,
    reviews: PropTypes.array,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }),
  setListings: PropTypes.func,
};

export default MyListingCard;
