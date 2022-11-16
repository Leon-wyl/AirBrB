import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllSortedUserDetails } from '../../Helper/Helper';
import AllListingCard from './components/AllListingCard';
import styles from './Home.module.css';

import SearchBar from './components/SearchBar';

const Home = () => {
  const { Title, Text } = Typography;
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  const [allListings, setAllListings] = useState([]);
  const [dateRange, setDateRange] = useState(0);

  useEffect(async () => {
    const listingsRes = await getAllSortedUserDetails(email, token);
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
          <SearchBar
            setAllListings={setAllListings}
            setDateRange={setDateRange}
          />
        </div>
        <div className={styles.cardContainer}>
          {allListings.length === 0 && <Text>No listing found.</Text>}
          {allListings.map((listing, key) => (
            <AllListingCard
              key={key}
              data={listing}
              listingId={listing.id}
              dateRange={dateRange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
