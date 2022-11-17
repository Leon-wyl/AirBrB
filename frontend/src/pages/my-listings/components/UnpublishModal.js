import { message, Modal, Typography, Button } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { putUnpublishListing } from '../../../api/ListingApi';
import { getAllSortedUserDetails } from '../../../Helper/Helper';

const UnpublishModal = (props) => {
  const { Text } = Typography;

  const { isModalOpen, setIsModalOpen, listingId, setListings } = props;

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  const handleOk = async () => {
    const unpublishCallback = async () => {
      setIsModalOpen(false);
      const res = await putUnpublishListing(listingId);
      if (res.status) {
        console.log(res);
        message.success('Unpublish listing successfully');
      } else if (res.response.status === 400) {
        message.error(res.response.data.error);
      } else if (res.response.status === 403) {
        message.error('User is invalid. Please log in or sign up again');
      } else {
        message.error('Something unexpected happened. Unpublish Unsuccessful');
      }
      const listingDetails = await getAllSortedUserDetails(email, token);
      const myListingDetails = listingDetails.filter(
        (listing) => listing.owner === email
      );
      setListings(myListingDetails);
    };
    unpublishCallback();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Unpublish Listing"
        open={isModalOpen}
        footer={[
          <Button key="1" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="2"
            name="unpublishSubmit"
            type="primary"
            onClick={handleOk}
          >
            OK
          </Button>,
        ]}
      >
        <Text>{'Are you sure to Unpublish this listing?'}</Text>
      </Modal>
    </>
  );
};

UnpublishModal.propTypes = {
  isModalOpen: PropTypes.bool,
  listingId: PropTypes.number,
  setIsModalOpen: PropTypes.func,
  setListings: PropTypes.func,
};

export default UnpublishModal;
