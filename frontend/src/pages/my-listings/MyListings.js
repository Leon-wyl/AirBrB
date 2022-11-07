import { Button } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { getAllListings, getListingWithId } from "../../api/ListingApi";
import styles from './MyListings.module.css';
import { Typography } from 'antd';
import { useHistory } from "react-router-dom";
import { UserContext } from "../../store/UserContext";
import MyListingCard from "./components/MyListingCard";

const MyListings = () => {
	const { Title } = Typography;

	const history = useHistory();

	const [listings, setListings] = useState([]);
	const [reloadCode, setReloadCode] = useState("");
	const {userInfo} = useContext(UserContext);

	const reload = async () => {
		// Fetech all listing data and filter out the ones the user created
		const listingsRes = (await getAllListings()).data.listings;
		const myListings = listingsRes.filter((listing) => listing.owner === userInfo.email)
		const listingsData = [];
		// For each listing, fetch the metadata of the listing, then create new listing object and push it to the array
		const lengthMyListings = myListings.length;
		for (let i = 0; i < lengthMyListings; i++) {
			const listingRes = (await getListingWithId(myListings[i].id)).data.listing;
			const listingMetadata = listingRes.metadata;
			const listingData = {
				id: myListings[i].id,
				title: myListings[i].title,
				propertyType: listingMetadata.propertyType,
				numBed: listingMetadata.numBed,
				numBathroom: listingMetadata.numBathroom,
				thumbnail: myListings[i].thumbnail,
				reviews: myListings[i].reviews,
				price: myListings[i].price,
				published: listingsRes.published,
			}
			listingsData.push(listingData);
			if (i === lengthMyListings - 1) setListings(listingsData);
		};	
	}

	useEffect(reload, [reloadCode]);

	const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

	console.log(listings)

	return (
		<div className={styles.outerContainer}>
			<div className={styles.innerContainer}>
				<div className={styles.header}>
					<Title className={styles.title}>My Listings</Title>
					<Button type='primary' size='large' onClick={() => history.push('/newlisting')}>
						Create New Listing
					</Button>
				</div>
				<div className={styles.cardContainer}>
				{listings.map((listing) => <MyListingCard data={listing} setReloadCode={setReloadCode}/>)}
				</div>
			</div>
		</div>
	);
}

export default MyListings;