import 'antd/dist/antd.min.css';
import { Button, PageHeader, Modal, message } from 'antd';
import React, { useState, useContext } from 'react';
import styles from './Navbar.module.css';
import { postLogout } from '../../api/AuthApi';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../store/UserContext';

const Navbar = () => {
  const history = useHistory();

  const { token, setToken } = useContext(UserContext);
  const localStorageToken = localStorage.getItem('token');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {
    const res = await postLogout();
    localStorage.setItem('email', '');
    localStorage.setItem('token', '');
    setToken('');
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
    token && localStorageToken ? setIsModalOpen(true) : history.push('/login');
  };

  return (
    <div className="site-page-header-ghost-wrapper">
      <Modal
        title="Log Out"
        open={isModalOpen}
        footer={[
          <Button key="1" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="2"
            name="logoutSubmit"
            type="primary"
            onClick={handleOk}
          >
            OK
          </Button>,
        ]}
      >
        <p>Are you sure to log out this account?</p>
      </Modal>
      <PageHeader
        ghost={false}
        backIcon={false}
        onBack={() => window.history.back()}
        title="AirBrB"
        extra={
          token && localStorageToken
            ? [
                <Button
                  className={styles.navbtn}
                  key="1"
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
                  name="logoutButton"
                  className={styles.navbtn}
                  key="3"
                  type="danger"
                  onClick={onLoginOrLogout}
                >
                  Logout
                </Button>,
              ]
            : [
                <Button
                  className={styles.navbtn}
                  key="1"
                  onClick={() => history.push('/')}
                >
                  Home
                </Button>,
                <Button
                  name="loginButton"
                  className={styles.navbtn}
                  key="2"
                  type="primary"
                  onClick={onLoginOrLogout}
                >
                  Login
                </Button>,
              ]
        }
      />
    </div>
  );
};

export default Navbar;
