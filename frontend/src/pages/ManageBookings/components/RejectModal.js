import React from 'react';
import { Modal, Typography } from 'antd';

const RejectModal = (props) => {
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
        title="Reject Booking"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Text>{'Are you sure to reject this booking?'}</Text>
      </Modal>
    </>
  );
};

export default RejectModal;
