import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import 'antd/dist/antd.min.css';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { postLogin } from '../../api/AuthApi';
import logo from '../../assets/logo-black.png';
import styles from './Login.module.css';
import { UserContext } from '../../store/UserContext';

const Login = () => {
  const history = useHistory();

  const { setToken } = useContext(UserContext);

  const onFinish = async (value) => {
    const res = await postLogin(value.email, value.password);
    if (res.status) {
      // Set email and token to local storage, and set token to useContext
      message.success('Login successfully');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', value.email);
      setToken(res.data.token);
      history.push('/mylistings');
    } else if (res.response.data.error) {
      message.error(res.response.data.error);
    } else {
      message.error('Something unexpected happened.');
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card} hoverable={true}>
        <div className={styles.logoContainer}>
          <img
            className={styles.logo}
            alt="logo"
            src={logo}
            width="200"
            height="60"
          />
        </div>
        <h1 className={styles.title}>Log In</h1>
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

          <Form.Item name="remember" className={styles.link}>
            <div name="linkToSignUp" role="link" onClick={() => history.push('/register')}>
              Not registered? Sign Up!
            </div>
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
