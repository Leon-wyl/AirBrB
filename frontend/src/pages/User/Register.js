import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import 'antd/dist/antd.min.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { postRegister } from '../../api/AuthApi';
import logo from '../../assets/logo-black.png';
import styles from './Login.module.css';
const Register = () => {
  const history = useHistory();

  const onFinish = async (value) => {
    const res = await postRegister(value.email, value.name, value.password);
    console.log(res);
    if (res.status) {
      message.success('Login successfully');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', value.email);
      history.push('/mylistings');
    } else if (res.response.data.error) {
      message.error(res.response.data.error);
    } else {
      message.error('Something unexpected happened.');
    }
  };

  const onFinishFailed = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card} hoverable={true}>
        <div className={styles.logoContainer}>
          <img
            className={styles.logo}
            alt='logo'
            src={logo}
            width='200'
            height='60'
          />
        </div>
        <h1 className={styles.title}>Sign Up</h1>
        <Form
          name='basic'
          labelCol={{
            span: 6,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input
              data-testid="name"
              name='name'
              prefix={<UserOutlined className={styles.icon}/>}
              placeholder='Name'
            />
          </Form.Item>
          <Form.Item
            name='email'
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
              name='email'
              prefix={<MailOutlined className={styles.icon}/>}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password
              data-testid="password"
              name='password'
              prefix={<LockOutlined className={styles.icon}/>}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name='confirmPassword'
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
                  return Promise.reject(
                    new Error('Two passwords do not match.')
                  );
                },
              }),
            ]}
          >
            <Input.Password
              data-testid="confirmPassword"
              name='confirmPassword'
              prefix={<LockOutlined className={styles.icon}/>}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item name='link' className={styles.link}>
            <div
              onClick={() => {
                history.push('/login');
              }}
            >
              Has account? Sign in!
            </div>
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
