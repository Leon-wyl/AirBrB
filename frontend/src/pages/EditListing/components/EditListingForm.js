import { Button, Form, Input, Select, message, Upload, Card } from "antd";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { propertyTypes, amenities } from "../../../constants/Constants";
import { getListingWithId, putListing } from "../../../api/ListingApi";
import { beforeUpload } from "../../../Helper/Helper";

const EditListingForm = () => {
  // The useState storing the thumbnail and image
  const [thumbnail, setThumbnail] = useState([]);
  const [imageGallery, setImageGallery] = useState([]);
  const [form] = Form.useForm();
  useEffect(async () => {
    // Get listing id from url
    const listingId = window.location.href.split("/")[4];
    getListingWithId(listingId).then((res) => {
      if (res.status) {
        // Set all fetched listing details into form
        const listingData = res.data.listing;
        const initialValues = {
          title: listingData?.title,
          addressLine: listingData?.address?.addressLine,
          city: listingData?.address?.city,
          state: listingData?.address?.state,
          country: listingData?.address?.country,
          price: listingData?.price,
          propertyType: listingData?.metadata?.propertyType,
          numBathroom: listingData?.metadata?.numBathroom,
          numBedroom: listingData?.metadata?.numBedroom,
          numBed: listingData?.metadata?.numBed,
          bedroomDetails: listingData?.metadata?.bedroomDetails,
          amenities: listingData?.metadata?.amenities,
        };
        form.setFieldsValue(initialValues);
        // Set thumbnail picture into state
        if (listingData.thumbnail !== "")
          setThumbnail([
            {
              uid: "-1",
              name: "avatar.png",
              status: "done",
              thumbUrl: listingData.thumbnail,
            },
          ]);
        // Set gallery image into state
        if (listingData?.metadata?.imageGallery) {
          const imageGalleryList = listingData?.metadata?.imageGallery?.map(
            (url, key) => {
              return {
                uid: key,
                name: "image" + key,
                status: "done",
                thumbUrl: url,
              };
            }
          );
          setImageGallery(imageGalleryList);
        }
      } else if (res.response.status === 403) {
        message.error("User is invalid. Please log in or sign up again");
        return;
      } else {
        message.error("Something unexpected happened. Delete Unsuccessful");
        return;
      }
    });
  }, []);

  const history = useHistory();

  const onFinish = async (value) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    // Create address object
    const address = {
      addressLine: value.addressLine,
      city: value.city,
      state: value.state,
      country: value.country,
    };
    // Map image files to data url
    const imageGalleryUrl = imageGallery.map((item) => item.thumbUrl);
    // create metadata object
    const metaData = {
      amenities: value.amenities,
      bedroomDetails: value.bedroomDetails,
      numBathroom: value.numBathroom,
      numBed: value.numBed,
      numBedroom: value.numBedroom,
      propertyType: value.propertyType,
      imageGallery: imageGalleryUrl,
    };
    // Check if the thumbnail is empty
    if (thumbnail.length === 0) {
      message.error('Please input a thumbnail.');
      return;
    }
    if (value.title) {
      // Send request
      const listingId = window.location.href.split("/")[4];
      const res = await putListing(
        listingId,
        value.title,
        address,
        value.price,
        thumbnail[0].thumbUrl,
        metaData
      );
      if (res.status) {
        console.log(res);
        message.success("Edit listing successfully");
        history.push("/mylistings");
      } else if (res.response.status === 400) {
        message.error("Input of infomation of the new listing in invalid");
      } else if (res.response.status === 403) {
        message.error("User is invalid. Please log in or sign up again");
        history.push("/login");
      } else {
        message.error("Something unexpected happened.");
      }
    }
  };
  const onFinishFailed = () => {};

  const [loading, setLoading] = useState(false);

  // When thumbnail number > 1, cut it to 1
  const handleThumbnailChange = (info) => {
    setThumbnail(info.fileList);
    if (info.fileList.length >= 2) {
      info.fileList.shift();
    }
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
  console.log(imageGallery);
  return (
    <>
      <Form
        form={form}
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
          name="city"
          label="City"
          rules={[
            {
              required: true,
              message: "Please input your scity!",
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
              message: "Please input a valid whole number!",
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
              message: "Please input your number of bathroom!",
            },
            {
              pattern: /^\d+$/,
              message: "Please input a valid whole number!",
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
              message: "Please input your number of bedroom!",
            },
            {
              pattern: /^\d+$/,
              message: "Please input a valid whole number!",
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
              message: "Please input your number of bed!",
            },
            {
              pattern: /^\d+$/,
              message: "Please input a valid whole number!",
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
              message: "Please input your bedroom details!",
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
            onChange={handleThumbnailChange}
            fileList={thumbnail}
            onRemove={() => setThumbnail([])}
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item name="imageGallery" label="Image Gallery">
          <Upload
            name="images"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={true}
            beforeUpload={beforeUpload}
            onChange={({ fileList: newFileList }) => {
              setImageGallery(newFileList);
            }}
            fileList={imageGallery}
          >
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
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
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Button size="large" onClick={() => history.push("/mylistings")}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditListingForm;
