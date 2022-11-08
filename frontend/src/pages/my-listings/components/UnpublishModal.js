import React from "react";
import { Modal, Typography, message } from "antd";

import { putUnpublishListing } from "../../../api/ListingApi";

const UnpublishModal = (props) => {
	const { Text } = Typography;
  const { isModalOpen, setIsModalOpen, listingId, setReloadCode } = props;

  const handleOk = async () => {
    const unpublishCallback = async () => {
      setIsModalOpen(false);
			console.log(listingId);
      const res = await putUnpublishListing(listingId);
      if (res.status) {
        console.log(res);
        message.success("Unpublish listing successfully");
        setReloadCode(listingId);
      } else if (res.response.status === 400) {
        message.error("Unpublish Unsuccessful");
      } else if (res.response.status === 403) {
        message.error("User is invalid. Please log in or sign up again");
      } else {
        message.error("Something unexpected happened. Unpublish Unsuccessful");
      }
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

export default UnpublishModal;
