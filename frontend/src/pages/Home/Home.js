import styles from "./Home.module.css";
import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import { getAllListings } from "../../api/ListingApi";
import AllListingCard from "./components/AllListingCard";
import { CompareNames } from "../../Helper/Helper";

const Home = () => {
  const { Title } = Typography;
	const [listings, setListings] = useState([])

	useEffect(async () => {
		const listingsRes = (await getAllListings()).data.listings;
		listingsRes.sort(CompareNames)
		setListings(listingsRes)
	}, [])

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <Title className={styles.title}>Welcome to AirBrB</Title>
        </div>
        <div className={styles.cardContainer}>
          {listings.map((listing) => (
            <AllListingCard data={listing} listingId={listing.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
