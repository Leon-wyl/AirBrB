import React from 'react';
import { Modal, Typography } from 'antd';

const AcceptModal = (props) => {
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
        title="Accept Booking"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Text>{'Are you sure to accept this booking?'}</Text>
      </Modal>
    </>
  );
};

export default AcceptModal;
