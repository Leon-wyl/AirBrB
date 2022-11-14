import React, { useContext, useState } from 'react';
import { Modal, Typography, Rate, Input, message } from 'antd';
import { UserContext } from '../../../store/UserContext';
import { getListingWithId, putReviewListing } from '../../../api/ListingApi';
import moment from 'moment';

const ReviewModal = (props) => {
  const { isModalOpen, setIsModalOpen, data, setData, acceptedBookings } =
    props;

  const { Title, Text } = Typography;
  const { TextArea } = Input;

  const { userInfo } = useContext(UserContext);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleOk = async () => {
    if (rating === 0) {
      message.error('Please rate the listing by clicking the stars');
      return;
    }
    if (comment === '') {
      message.error('Please write a comment');
      return;
    }
    const review = {
      user: userInfo?.email,
      time: moment(),
      rating: rating,
      comment: comment,
    };
    const res = await putReviewListing(data.id, acceptedBookings[0].id, review);
    if (res.status) {
      message.success('Review listing successfully');
      const listingRes = await getListingWithId(data.id);
      const listingDetail = listingRes.data.listing;
      setData({ ...listingDetail, id: data.id });
    } else if (res.response.status === 400) {
      console.log(res);
      message.error(res.response.data.error);
    } else if (res.response.status === 403) {
      message.error('User is invalid. Please log in or sign up again');
    } else {
      message.error('Something unexpected happened.');
    }
    setRating(0);
    setComment('');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
		setRating(0);
    setComment('');
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Add an Review"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Title level={5}>Rating:</Title>
      <div>
        <Rate
          allowHalf
          defaultValue={0}
          onChange={(value) => setRating(value)}
        />
        <Text>{`(${rating})`}</Text>
      </div>
      <Title level={5} style={{ marginTop: '10px' }}>
        Review:
      </Title>
      <TextArea row={4} onChange={(event) => setComment(event.target.value)} />
    </Modal>
  );
};

export default ReviewModal;
