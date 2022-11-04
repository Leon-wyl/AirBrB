import React, { useContext } from 'react';
import 'antd/dist/antd.min.css';
import { Card, Form, Input, Button, message } from 'antd';
import styles from './Login.module.css';
import logo from '../../assets/logo-black.png';
import { useHistory } from 'react-router-dom';
import { postLogin } from '../../api/AuthApi';
import { UserContext } from '../../store/UserContext';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const Login = () => {
  const history = useHistory();

  const { setUserInfo } = useContext(UserContext);

  const onFinish = async (value) => {
    const res = await postLogin(value.email, value.password);
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

  const onFinishFailed = () => {};

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
        <h1 className={styles.title}>Log In</h1>
        <Form
          name='basic'
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
              prefix={<MailOutlined className={styles.icon} />}
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

          <Form.Item name='remember' className={styles.link}>
            <div onClick={() => history.push('/register')}>
              Not registered? Sign Up!
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

export default Login;
