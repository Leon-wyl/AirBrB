import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal, Typography, Rate, Input, message, Form, Button } from 'antd';
import { getListingWithId, putReviewListing } from '../../../api/ListingApi';
import moment from 'moment';

const ReviewModal = (props) => {
  const { isModalOpen, setIsModalOpen, data, setData, acceptedBookings } =
    props;

  const { Text } = Typography;
  const { TextArea } = Input;

  const [rating, setRating] = useState(0);

  const handleOk = async (values) => {
    const review = {
      user: localStorage.getItem('email'),
      time: moment(),
      rating,
      comment: values.comment,
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
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setRating(0);
    setIsModalOpen(false);
  };

  const onFinishFailed = () => {
    message.error('Please write a comment');
  };

  return (
    <Modal
      title="Add an Review"
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{ span: 14, offset: 0 }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleOk}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Rating"
          rules={[
            {
              required: true,
              message: 'Please rate your experience!',
            },
          ]}
        >
          <Rate
            label='rate'
            allowHalf
            defaultValue={0}
            onChange={(value) => setRating(value)}
          />
          <Text>{`(${rating})`}</Text>
        </Form.Item>

        <Form.Item
          label="Comment"
          name="comment"
          rules={[
            {
              required: true,
              message: 'Please write down your comment!',
            },
          ]}
        >
          <TextArea label='comment' row={4} />
        </Form.Item>

        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

ReviewModal.propTypes = {
  acceptedBookings: PropTypes.array,
  data: PropTypes.shape({
    id: PropTypes.number,
  }),
  isModalOpen: PropTypes.bool,
  setData: PropTypes.func,
  setIsModalOpen: PropTypes.func,
};

export default ReviewModal;
