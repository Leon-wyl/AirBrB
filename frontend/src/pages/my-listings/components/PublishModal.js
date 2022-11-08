import React from "react";
import { Modal, Typography, message, Form, DatePicker, Button } from "antd";
import DynamicField from "./DynamicField";
import { toRangeObject } from "../../../Helper/Helper";
import { putPublishListing } from "../../../api/ListingApi";
import moment from "moment";

const PublishModal = (props) => {
  const { Title } = Typography;
  const { RangePicker } = DatePicker;
  const { isModalOpen, setIsModalOpen, listingId, setReloadCode } = props;

  const [form] = Form.useForm();

  const onFinish = async (value) => {
    const publishCallback = async (value) => {
      setIsModalOpen(false);
      const availableRanges = [];
      const firstRange = toRangeObject(value.firstRange);
      availableRanges.push(firstRange);
      if (value.fields) {
        value.fields.forEach((item) => {
          const rangeObject = toRangeObject(item.range);
          availableRanges.push(rangeObject);
        });
      }
      const res = await putPublishListing(listingId, availableRanges);
      if (res.status) {
        console.log(res);
        message.success("Publish listing successfully");
        setReloadCode(Math.random);
      } else if (res.response.status === 400) {
        message.error("Publish Unsuccessful");
      } else if (res.response.status === 403) {
        message.error("User is invalid. Please log in or sign up again");
      } else {
        message.error("Something unexpected happened. Delete Unsuccessful");
      }
    };
    publishCallback(value);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Publish Listing"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        <Title level={5}>Select Available Ranges:</Title>
        <Form
          onFinish={onFinish}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Form.Item
            name="firstRange"
            rules={[{ required: true, message: "Please enter a date range" }]}
          >
            <RangePicker
              disabledDate={(currentDate) => currentDate <= moment().subtract(1, 'd')}
            />
          </Form.Item>
          <DynamicField />
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PublishModal;
