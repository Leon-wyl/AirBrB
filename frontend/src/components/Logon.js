import PropTypes from "prop-types"
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import 'antd/dist/antd.min.css';
import React from 'react';
import logo from '../assets/logo-black.png';
import styles from '../pages/User/Login.module.css';

const Logon = ({ onFinish }) => {
  return (
    <div className={styles.container}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
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
            name="email"
            className="loginEmail"
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
            name="password"
            className="loginPassword"
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

Logon.propTypes = {
	onFinish: PropTypes.func
}

export default Logon;
