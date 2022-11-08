import 'antd/dist/antd.min.css';
import { Button, PageHeader, Modal, message } from 'antd';
import React, { useContext, useState } from 'react';
import styles from './Navbar.module.css';
import { UserContext } from '../../store/UserContext';
import { postLogout } from '../../api/AuthApi';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const history = useHistory();

  const { userInfo, setUserInfo } = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const res = await postLogout();

    localStorage.clear();
    setUserInfo({});
    setIsModalOpen(false);

    if (res.status) {
      message.success('Log out successfully');
    } else if (res.response?.status === 403) {
      message.error('Invalid User');
    } else {
      message.error('Something unexpected happened.');
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='site-page-header-ghost-wrapper'>
      <Modal
        title='Log Out'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure to log out this account?</p>
      </Modal>
      {userInfo?.token ? (
        <PageHeader
          ghost={false}
          backIcon={false}
          onBack={() => window.history.back()}
          title='AirBrB'
          extra={[
            <Button className={styles.navbtn} key='3' onClick={() => history.push('/')}>
              Home
            </Button>,
            <Button className={styles.navbtn} key='2' onClick={() => history.push('/mylistings')}>
              My Listings
            </Button>,
            <Button
              className={styles.navbtn}
              key='1'
              type='danger'
              onClick={showModal}
            >
              Logout
            </Button>,
          ]}
        />
      ) : (
        <PageHeader
          ghost={false}
          backIcon={false}
          onBack={() => window.history.back()}
          title='AirBrB'
          extra={[
            <Button className={styles.navbtn} key='1' type='primary' onClick={() => history.push('/login')}>
              Log In
            </Button>,
          ]}
        />
      )}
    </div>
  );
};

export default Navbar;
