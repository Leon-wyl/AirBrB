import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Select, Upload } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postNewListing } from '../../../api/ListingApi';
import { amenities, propertyTypes } from '../../../constants/Constants';
import { beforeUpload } from '../../../Helper/Helper';

const CreateNewListingForm = () => {
  const history = useHistory();

  const onFinish = async (value) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Construct address and metadata
    const address = {
      addressLine: value.addressLine,
      city: value.city,
      state: value.state,
      country: value.country,
    };
    const metaData = {
      amenities: value.amenities,
      bedroomDetails: value.bedroomDetails,
      numBathroom: Number(value.numBathroom),
      numBed: Number(value.numBed),
      numBedroom: Number(value.numBedroom),
      propertyType: value.propertyType,
      imageGallery: [],
    };
    // Send the new listing to the backend
    if (value.title) {
      const res = await postNewListing(
        value.title,
        address,
        Number(value.price),
        imageUrl,
        metaData
      );
      if (res.status) {
        console.log(res);
        message.success('Creat new listing successfully');
        history.push('/mylistings');
      } else if (res.response.status === 400) {
        message.error(res.response.data.error);
      } else if (res.response.status === 403) {
        message.error('User is invalid. Please log in or sign up again');
      } else {
        message.error('Something unexpected happened.');
      }
    }
  };

  const [imageUrl, setImageUrl] = useState();

  // Handle the change on the thumbnail list: no more than 1 thumbnail
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
      <PlusOutlined />
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
          <Input name="title" placeholder="E.g. A Nice House" />
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
          <Input name="addressLine" placeholder="E.g. 233 Anzac Parade" />
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
          <Input name="city" placeholder="E.g. Sydney" />
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
          <Input name="state" placeholder="E.g. NSW" />
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
          <Input name="country" placeholder="E.g. Australia" />
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
          <Input name="price" placeholder="Price in USD, E.g. 230" />
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
            name="propertyType"
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
          <Input name="numBathroom" placeholder="E.g. 5" />
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
          <Input name="numBedroom" placeholder="E.g. 5" />
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
          <Input name="numBed" placeholder="E.g. 5" />
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
          <Input
            name="bedroomDetails"
            placeholder="For example, how many beds in each bedroom and their sizes"
          />
        </Form.Item>

        <Form.Item name="amenities" label="Amenities">
          <Select
            name="amenities"
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
        >
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
