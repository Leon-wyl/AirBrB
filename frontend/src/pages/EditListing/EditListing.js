import { Typography } from 'antd';
import React from 'react';
import EditListingForm from './components/EditListingForm';
import styles from './EditListing.module.css';

const EditListing = () => {
  const { Title } = Typography;

  return (
    <>
      <div className={styles.outerContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.header}>
            <Title>Edit Listing</Title>
          </div>
          <div className={styles.formContainer}>
            <EditListingForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditListing;
