import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Modal, Typography, message } from 'antd';
import { UserContext } from '../../../store/UserContext';
import { getAllSortedUserDetails } from '../../../Helper/Helper';
import { deleteListing } from '../../../api/ListingApi';

const DeleteModal = (props) => {
  const { Text } = Typography;

  const { userInfo } = useContext(UserContext);

  const { isModalOpen, setIsModalOpen, listingId, setListings } = props;

  const handleOk = async () => {
    const deleteCallback = async () => {
      setIsModalOpen(false);
      console.log(listingId);
      const res = await deleteListing(listingId);
      if (res.status) {
        console.log(res);
        message.success('Delete listing successfully');
      } else if (res.response.status === 400) {
        message.error('Delete Unsuccessful');
      } else if (res.response.status === 403) {
        message.error('User is invalid. Please log in or sign up again');
      } else {
        message.error('Something unexpected happened. Delete Unsuccessful');
      }
      const listingDetails = await getAllSortedUserDetails(userInfo);
      const myListingDetails = listingDetails.filter(
        (listing) => listing.owner === userInfo.email
      );
      setListings(myListingDetails);
    };
    deleteCallback();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Delete Listing"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Text>{'Are you sure to delete this listing?'}</Text>
      </Modal>
    </>
  );
};

DeleteModal.propTypes = {
  isModalOpen: PropTypes.bool,
  listingId: PropTypes.number,
  setIsModalOpen: PropTypes.func,
  setListings: PropTypes.func,
};

export default DeleteModal;
