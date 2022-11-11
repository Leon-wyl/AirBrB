import React, { useEffect, useState, useContext } from 'react';
import { getAllListings, getListingWithId } from '../../api/ListingApi';
import styles from './MyListings.module.css';
import { Button, Typography, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../store/UserContext';
import MyListingCard from './components/MyListingCard';
import { getAllSortedUserDetails } from '../../Helper/Helper';

const MyListings = () => {
  const { Title } = Typography;

  const history = useHistory();

  const [listings, setListings] = useState([]);
  console.log(listings);
  const { userInfo } = useContext(UserContext);

  useEffect(async () => {
    const listingDetails = await getAllSortedUserDetails(userInfo);
		const myListingDetails = listingDetails.filter((listing) => listing.owner === userInfo.email);
    setListings(myListingDetails);
  }, []);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <Title className={styles.title}>My Listings</Title>
          <Button
            type="primary"
            size="large"
            onClick={() => history.push('/newlisting')}
          >
            Create New Listing
          </Button>
        </div>
        <div className={styles.cardContainer}>
          {listings.map((listing, key) => (
            <MyListingCard key={key} data={listing} setListings={setListings} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyListings;
