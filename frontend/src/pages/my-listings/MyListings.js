import { Button, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllSortedUserDetails } from '../../Helper/Helper';
import MyListingCard from './components/MyListingCard';
import styles from './MyListings.module.css';

const MyListings = () => {
  const { Title, Text } = Typography;

  const history = useHistory();

  const [listings, setListings] = useState([]);
  const email = localStorage.getItem('email')
  const token = localStorage.getItem('token')

  useEffect(async () => {
    const listingDetails = await getAllSortedUserDetails(email, token);
    const myListingDetails = listingDetails.filter(
      (listing) => listing.owner === email
    );
    setListings(myListingDetails);
  }, []);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <Title className={styles.title}>My Listings</Title>
          <Button
            name='createNewListing'
            type="primary"
            size="large"
            onClick={() => history.push('/newlisting')}
          >
            Create New Listing
          </Button>
        </div>
        <div className={styles.cardContainer}>
          {listings.length === 0 && (
            <Text style={{ fontSize: '16px' }}>
              You have not created any listings yet. Click the &apos;Create New
              Listing&apos; button to create a new listing.
            </Text>
          )}
          {listings.map((listing, key) => (
            <MyListingCard key={key} data={listing} setListings={setListings} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyListings;
