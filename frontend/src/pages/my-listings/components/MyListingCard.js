import { Typography, Card, Rate, Button, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import styles from "./MyListingCard.module.css";
import DeleteModal from "./DeleteModal";
import { useHistory } from "react-router-dom";
import PublishModal from "./PublishModal";
import UnpublishModal from "./UnpublishModal";

const { Meta } = Card;

const MyListingCard = (props) => {
  const { data, setReloadCode } = props;
  const { Text } = Typography;

  const history = useHistory();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isUnpublishModalOpen, setIsUnpublishModalOpen] = useState(false);

  const numRatings = data.reviews.length;
  const rating =
    numRatings === 0
      ? 0
      : data.review.reduce((prev, curr) => prev.rating + curr.rating, 0) /
        numRatings;

  return (
    <>
      <DeleteModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        setReloadCode={setReloadCode}
        listingId={data.id}
      />
      <PublishModal
        isModalOpen={isPublishModalOpen}
        setIsModalOpen={setIsPublishModalOpen}
        setReloadCode={setReloadCode}
        listingId={data.id}
      />
      <UnpublishModal
        isModalOpen={isUnpublishModalOpen}
        setIsModalOpen={setIsUnpublishModalOpen}
        setReloadCode={setReloadCode}
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
            style={{ border: "transparent", backgroundColor: "transparent" }}
            size="small"
            onClick={() =>
              data.published
                ? setIsUnpublishModalOpen(true)
                : setIsPublishModalOpen(true)
            }
          >
            {data.published ? "Unpublish" : "Publish"}
          </Button>,
          <Button
            style={{ border: "transparent", backgroundColor: "transparent" }}
            size="small"
          >
            Bookings
          </Button>,
          <EditOutlined
            key="edit"
            onClick={() => history.push(`/editlisting/${data.id}`)}
          />,
          <DeleteOutlined
            key="delete"
            onClick={() => setIsDeleteModalOpen(true)}
          />,
        ]}
      >
        <Meta title={data.title} />
        <div className={styles.desContainer}>
          <Text className={styles.description} type="secondary">
            Price: {`$${data.price}`}
          </Text>
          <Text className={styles.description} type="secondary">
            Property Type: {`${data.propertyType}`}
          </Text>
          <Text className={styles.description} type="secondary">
            Number of Beds: {`${data.numBed}`}
          </Text>
          <Text className={styles.description} type="secondary">
            Number of Bathrooms: {`${data.numBathroom}`}
          </Text>
          <div>
            <Rate size="small" disabled allowHalf defaultValue={rating} />
            <Text type="secondary"> {`(${rating})`}</Text>
          </div>
          <Text  className={styles.description} type="secondary">
            Number of Ratings: {`${numRatings}`}
          </Text>
        </div>
      </Card>
    </>
  );
};

export default MyListingCard;
