import { Button, Form, Input, Select, message, Upload, Card } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { propertyTypes, amenities } from '../../../constants/Constants';
import { postNewListing } from '../../../api/ListingApi';
import { beforeUpload } from '../../../Helper/Helper';

const CreateNewListingForm = () => {
  const history = useHistory();

  const onFinish = async (value) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const address = {
      addressLine: value.addressLine,
      city: value.city,
      state: value.state,
      country: value.country,
    };
    const metaData = {
      amenities: value.amenities,
      bedroomDetails: value.bedroomDetails,
      numBathroom: value.numBathroom,
      numBed: value.numBed,
      numBedroom: value.numBedroom,
      propertyType: value.propertyType,
      imageGallery: [],
    };
    console.log(metaData);
    if (value.title) {
      const res = await postNewListing(
        value.title,
        address,
        value.price,
        imageUrl,
        metaData
      );
      if (res.status) {
        console.log(res);
        message.success('Creat new listing successfully');
        history.push('/mylistings');
      } else if (res.response.status === 400) {
        message.error('Input of infomation of the new listing in invalid');
      } else if (res.response.status === 403) {
        message.error('User is invalid. Please log in or sign up again');
        history.push('/login');
      } else {
        message.error('Something unexpected happened.');
      }
    }
  };
  const onFinishFailed = () => {};

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    console.log(info);
    if (info.fileList.length >= 2) {
      info.fileList.shift();
    }
    setTimeout(() => {
      console.log(info);
      info?.fileList[0]?.thumbUrl
        ? setImageUrl(info.fileList[0].thumbUrl)
        : setImageUrl('');
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

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{ span: 9 }}
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
              message: 'Please input the title of your listing!',
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
              message: 'Please input your address line!',
            },
          ]}
        >
          <Input placeholder="Address Line" />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
              message: 'Please input your city!',
            },
          ]}
        >
          <Input placeholder="City" />
        </Form.Item>

        <Form.Item
          name="state"
          label="State"
          rules={[
            {
              required: true,
              message: 'Please input your state!',
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
              message: 'Please input your country!',
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
              message: 'Please input your price!',
            },
            {
              pattern: /^\d+$/,
              message: 'Please input a valid whole number!',
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
              message: 'Please select a property type!',
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
              message: 'Please input your number of bathroom!',
            },
            {
              pattern: /^\d+$/,
              message: 'Please input a valid whole number!',
            },
          ]}
        >
          <Input placeholder="Number of Bathroom" />
        </Form.Item>

        <Form.Item
          name="numBedroom"
          label="Number of Bedroom"
          rules={[
            {
              required: true,
              message: 'Please input your number of bedroom!',
            },
            {
              pattern: /^\d+$/,
              message: 'Please input a valid whole number!',
            },
          ]}
        >
          <Input placeholder="Number of Bathroom" />
        </Form.Item>

        <Form.Item
          name="numBed"
          label="Number of Bed"
          rules={[
            {
              required: true,
              message: 'Please input your number of bed!',
            },
            {
              pattern: /^\d+$/,
              message: 'Please input a valid whole number!',
            },
          ]}
        >
          <Input placeholder="Number of Bathroom" />
        </Form.Item>

        <Form.Item
          name="bedroomDetails"
          label="Bedroom details"
          rules={[
            {
              required: true,
              message: 'Please input your bedroom details!',
            },
          ]}
        >
          <Input placeholder="For example, how many beds in each bedroom and their sizes" />
        </Form.Item>

        <Form.Item name="amenities" label="Amenities">
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

        <Form.Item name="thumbnail" label="Thumbnail">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={true}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            onRemove={() => setImageUrl('')}
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            onClick={onFinish}
          >
            Submit
          </Button>
        </Form.Item>

        <Form.Item
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <Button size="large" onClick={() => history.push('/mylistings')}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateNewListingForm;
