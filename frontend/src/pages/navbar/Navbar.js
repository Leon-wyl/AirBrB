import 'antd/dist/antd.min.css';
import { Button, PageHeader, Modal, message } from 'antd';
import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { postLogout } from '../../api/AuthApi';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {
    const res = await postLogout();
    localStorage.setItem('email', '');
    localStorage.setItem('token', '');
    setIsModalOpen(false);
    if (res.status) {
      message.success('Log out successfully');
      history.push('/login');
    } else if (res.response?.status === 403) {
      message.error('Invalid User, please login or sign out again');
      history.push('/login');
    } else {
      message.error('Something unexpected happened.');
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onLoginOrLogout = () => {
    const token = localStorage.getItem('token');
    token ? setIsModalOpen(true) : history.push('/login');
  };

  return (
    <div className="site-page-header-ghost-wrapper">
      <Modal
        title="Log Out"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure to log out this account?</p>
      </Modal>
      <PageHeader
        ghost={false}
        backIcon={false}
        onBack={() => window.history.back()}
        title="AirBrB"
        extra={[
          <Button
            className={styles.navbtn}
            key="3"
            onClick={() => history.push('/')}
          >
            Home
          </Button>,
          <Button
            className={styles.navbtn}
            key="2"
            onClick={() => history.push('/mylistings')}
          >
            My Listings
          </Button>,
          <Button
            name="loginButton"
            className={styles.navbtn}
            key="1"
            type="primary"
            onClick={onLoginOrLogout}
          >
            Login/Logout
          </Button>,
        ]}
      />
    </div>
  );
};

export default Navbar;
