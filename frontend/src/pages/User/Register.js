import React, { useContext } from 'react';
import 'antd/dist/antd.min.css';
import { Card, Form, Input, Button, message } from 'antd';
import styles from './Login.module.css';
import logo from '../../assets/logo-black.png';
import { postRegister } from '../../api/AuthApi';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../store/UserContext';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const Register = () => {
  const history = useHistory();

  const { setUserInfo } = useContext(UserContext);

  const onFinish = async (value) => {
    const res = await postRegister(value.email, value.name, value.password);
    console.log(res);
    if (res.status) {
      message.success('Login successfully');
      localStorage.setItem('token', res.data.token);
      setUserInfo({
        email: value.email,
        token: res.data.token,
      });
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
