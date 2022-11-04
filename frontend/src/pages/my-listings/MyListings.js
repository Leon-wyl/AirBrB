import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { getAllListings } from "../../api/ListingApi";
import styles from './MyListings.module.css';
import { Typography } from 'antd';
import CreateNewListingModal from "./components/CreateNewListingModal";

const MyListings = () => {
	const { Title } = Typography;

	useEffect(() => {
		const allListings = getAllListings();
		console.log(allListings);
	}, [])

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

	return (
		<div className={styles.outerContainer}>
			<div className={styles.innerContainer}>
				<CreateNewListingModal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}/>
				<div className={styles.header}>
					<Title>My Listings</Title>
					<Button type='primary' size='large' onClick={showModal}>
						Create New Listing
					</Button>
				</div>
			</div>
		</div>
	);
}

export default MyListings;