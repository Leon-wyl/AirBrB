import React from "react";
import { Modal, Typography, message } from "antd";

import { deleteListing } from "../../../api/ListingApi";

const DeleteModal = (props) => {
	const { Text } = Typography;
  const { isModalOpen, setIsModalOpen, listingId, setReloadCode } = props;

  const handleOk = async () => {
    const deleteCallback = async () => {
      setIsModalOpen(false);
			console.log(listingId)
      const res = await deleteListing(listingId);
      if (res.status) {
        console.log(res);
        message.success("Delete listing successfully");
        setReloadCode(listingId);
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

export default DeleteModal;
