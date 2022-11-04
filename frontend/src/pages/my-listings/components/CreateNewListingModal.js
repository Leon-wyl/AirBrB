import { Button, Modal, Form, Input, Select, message, Upload } from "antd";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { propertyTypes, amenities } from "../../../constants/Constants";

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  return false;
};

const CreateNewListingModal = (props) => {
  const { open, onOk, onCancel } = props;

  const onFinish = () => {};
  const onFinishFailed = () => {};

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    console.log(info);
    if (info.fileList.length >= 2) {
      info.fileList.shift();
    }
    setTimeout(() => {
      info?.fileList[0]?.thumbUrl
        ? setImageUrl(info.fileList[0].thumbUrl)
        : setImageUrl("");
    }, 100);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  console.log(imageUrl);
  return (
    <>
      <Modal
        title="Create New Listing"
        open={open}
        onOk={onOk}
        onCancel={onCancel}
				footer={[]}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input the title of your listing!",
              },
            ]}
          >
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item
            name="addressLine"
            label="Address Line"
            rules={[
              {
                required: true,
                message: "Please input your address line!",
              },
            ]}
          >
            <Input placeholder="Address Line" />
          </Form.Item>

          <Form.Item
            name="state"
            label="State"
            rules={[
              {
                required: true,
                message: "Please input your state!",
              },
            ]}
          >
            <Input placeholder="State" />
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                required: true,
                message: "Please input your country!",
              },
            ]}
          >
            <Input placeholder="Country" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
              {
                pattern: /^\d+$/,
                message: "Please input a whole number!",
              },
            ]}
          >
            <Input placeholder="Price in USD" />
          </Form.Item>

          <Form.Item
            name="propertyType"
            label="Property Type"
            rules={[
              {
                required: true,
                message: "Please select a property type!",
              },
            ]}
          >
            <Select
              placeholder="Please select a property type"
              optionLabelProp="label"
            >
              {propertyTypes.map((item, idx) => (
                <Select.Option key={idx} value={item} label={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="numBathroom"
            label="Number of Bathroom"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
              {
                pattern: /^\d+$/,
                message: "Please input a whole number!",
              },
            ]}
          >
            <Input placeholder="Number of Bathroom" />
          </Form.Item>

          <Form.Item
            name="amenities"
            label="Amenities"
            rules={[
              {
                required: true,
                message: "Please select a property type!",
              },
            ]}
          >
            <Select
              placeholder="Please select a property type"
              optionLabelProp="label"
              mode="multiple"
            >
              {amenities.map((item, idx) => (
                <Select.Option key={idx} value={item} label={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="thumbnail"
            label="Thumbnail"
            rules={[
              {
                required: true,
                message: "Please upload a thumbnail!",
              },
            ]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={true}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              onRemove={() => setImageUrl("")}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateNewListingModal;
