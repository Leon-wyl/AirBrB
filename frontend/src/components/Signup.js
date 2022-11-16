import PropTypes from 'prop-types'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import 'antd/dist/antd.min.css';
import React from 'react';
import styles from '../pages/User/Login.module.css';

const Signup = ({ onFinish }) => {
  return (
    <div className={styles.container}>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input
            data-testid="name"
            name="name"
            prefix={<UserOutlined className={styles.icon} />}
            placeholder="Name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Please enter a valid email.',
            },
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            data-testid="email"
            name="email"
            prefix={<MailOutlined className={styles.icon} />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password
            data-testid="password"
            name="password"
            prefix={<LockOutlined className={styles.icon} />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            ({ getFieldValue }) => ({
              validator (_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Two passwords do not match.'));
              },
            }),
          ]}
        >
          <Input.Password
            data-testid="confirmPassword"
            name="confirmPassword"
            prefix={<LockOutlined className={styles.icon} />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" htmlType="submit" onClick={onFinish}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

Signup.propTypes = {
  onFinish: PropTypes.func
}

export default Signup;
