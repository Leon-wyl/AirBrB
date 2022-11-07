import { Typography, Card, Rate, Button, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import styles from "./MyListingCard.module.css";
import { deleteListing, getAllListings} from "../../../api/ListingApi";
import { useHistory } from "react-router-dom";

const { Meta } = Card;

const MyListingCard = (props) => {
  const { data, setReloadCode } = props;
  const { Text } = Typography;

  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const deleteCallback = async () => {
      setIsModalOpen(false);
      const res = await deleteListing(data.id);
      if (res.status) {
        console.log(res);
        message.success("Delete listing successfully");
        setReloadCode(data.id);
      } else if (res.response.status === 400) {
        message.error("Delete Unsuccessful");
      } else if (res.response.status === 403) {
        message.error("User is invalid. Please log in or sign up again");
      } else {
        message.error("Something unexpected happened. Delete Unsuccessful");
      }
      
    };
    deleteCallback();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const numRatings = data.reviews.length;
  const rating =
    numRatings === 0
      ? 0
      : data.review.reduce((prev, curr) => prev.rating + curr.rating, 0) /
        numRatings;

  return (
    <>
      <Modal
        title="Delete Listing"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Text>{`Are you sure to delete the listing with title '${data.title}'?`}</Text>
      </Modal>
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
          >
            {data.publish ? "Unpublish" : "Publish"}
          </Button>,
          <Button
            style={{ border: "transparent", backgroundColor: "transparent" }}
            size="small"
          >
            Bookings
          </Button>,
          <EditOutlined key="edit" onClick={() => history.push(`/editlisting/${data.id}`)}/>,
          <DeleteOutlined key="delete" onClick={showModal} />,
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
          <Rate size="small" disabled allowHalf defaultValue={rating} />
          <Text className={styles.description} type="secondary">
            Number of Ratings: {`${numRatings}`}
          </Text>
        </div>
      </Card>
    </>
  );
};

export default MyListingCard;
