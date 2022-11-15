import styles from './Home.module.css';
import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { getAllListings } from '../../api/ListingApi';
import AllListingCard from './components/AllListingCard';
import { getAllSortedUserDetails } from '../../Helper/Helper';
import { useContext } from 'react';
import { UserContext } from '../../store/UserContext';
import { getBookings } from '../../api/BookingApi';
import SearchBar from './components/SearchBar';

const Home = () => {
  const { Title } = Typography;
  const { userInfo, setDateRange } = useContext(UserContext);
  const [allListings, setAllListings] = useState([]);

  useEffect(async () => {
    const listingsRes = await getAllSortedUserDetails(userInfo);
    const publishedListings = listingsRes.filter(
      (listing) => listing.published
    );
    setDateRange(0);
    setAllListings(publishedListings);
  }, []);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <Title className={styles.title}>Welcome to AirBrB</Title>
        </div>
        <div className={styles.searchBarContainer}>
          <SearchBar setAllListings={setAllListings} />
        </div>
        <div className={styles.cardContainer}>
          {allListings.map((listing, key) => (
            <AllListingCard key={key} data={listing} listingId={listing.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
