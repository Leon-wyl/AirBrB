import React from 'react';
import { Modal, Typography } from 'antd';

const DeleteModal = (props) => {
  const { isModalOpen, setIsModalOpen } = props;

  const { Text } = Typography;

	const handleOk = () => {
		setIsModalOpen(false);
	}

	const handleCancel = () => {
		setIsModalOpen(false);
	}

  return (
    <>
      <Modal
        title="Delete Booking"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Text>{'Are you sure to delete this booking?'}</Text>
      </Modal>
    </>
  );
};

export default DeleteModal;
