import { Typography, Card, Rate } from "antd";
import React from "react";
import styles from "../../my-listings/components/MyListingCard.module.css";

const { Meta } = Card;

const AllListingCard = (props) => {
  const { data } = props;
  console.log(data);
  const { Text } = Typography;
  const numRatings = data?.reviews?.length;
  const rating =
    numRatings === 0
      ? 0
      : data.review.reduce((prev, curr) => prev.rating + curr.rating, 0) /
        numRatings;

  return (
    <>
      <Card
        hoverable={true}
        className={styles.card}
        style={{
          width: 300,
        }}
        cover={<img alt={`thumbnail-${data.id}`} src={data.thumbnail} />}
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
          <Text className={styles.description} type={data.published ? "success" : "danger"}>{data.published ? "Available" : "Unavailable"}</Text>
        </div>
      </Card>
    </>
  );
};

export default AllListingCard;
