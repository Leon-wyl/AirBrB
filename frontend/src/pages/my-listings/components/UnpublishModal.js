import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Modal, Typography, message } from 'antd';
import { putUnpublishListing } from '../../../api/ListingApi';
import { UserContext } from '../../../store/UserContext';
import { getAllSortedUserDetails } from '../../../Helper/Helper';

const UnpublishModal = (props) => {
  const { Text } = Typography;

  const { isModalOpen, setIsModalOpen, listingId, setListings } = props;

  const { userInfo } = useContext(UserContext);

  const handleOk = async () => {
    const unpublishCallback = async () => {
      setIsModalOpen(false);
      const res = await putUnpublishListing(listingId);
      if (res.status) {
        console.log(res);
        message.success('Unpublish listing successfully');
      } else if (res.response.status === 400) {
        message.error('Unpublish Unsuccessful');
      } else if (res.response.status === 403) {
        message.error('User is invalid. Please log in or sign up again');
      } else {
        message.error('Something unexpected happened. Unpublish Unsuccessful');
      }
      const listingDetails = await getAllSortedUserDetails(userInfo);
      const myListingDetails = listingDetails.filter(
        (listing) => listing.owner === userInfo.email
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
        onOk={handleOk}
        onCancel={handleCancel}
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
