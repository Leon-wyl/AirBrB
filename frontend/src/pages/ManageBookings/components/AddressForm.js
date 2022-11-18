import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import React from 'react';

const AddressForm = ({ onOK, onCancel, isModalOpen }) => {
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
      >
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
          <Input
            data-testid="addressLine"
            name="addressLine"
            placeholder="E.g. 233 Anzac Parade"
          />
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
          <Input data-testid="city" name="city" placeholder="E.g. Sydney" />
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
          <Input data-testid="state" name="state" placeholder="E.g. NSW" />
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
          <Input
            data-testid="country"
            name="country"
            placeholder="E.g. Australia"
          />
        </Form.Item>

        <Form.Item
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <Button
            data-testid="submitBtn"
            type="primary"
            size="large"
            htmlType="submit"
            onClick={onOK}
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
          <Button data-testid="cancelBtn" size="large" onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

AddressForm.propTypes = {
  isModalOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onOK: PropTypes.func,
};

export default AddressForm;
