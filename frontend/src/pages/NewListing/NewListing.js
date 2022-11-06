import { Button } from "antd";
import React from "react";
import styles from './NewListing.module.css';
import { Typography } from 'antd';
import CreateNewListingForm from "./components/CreateNewListingForm";

const NewListing = () => {
	const { Title } = Typography;

	return (
		<div className={styles.outerContainer}>
			<div className={styles.innerContainer}>
				<div className={styles.header}>
					<Title>Create New Listing</Title>
				</div>
				<CreateNewListingForm />
			</div>
		</div>
	);
}

export default NewListing;