import React, { useState, useContext } from "react";
import { Input } from "antd";
import { getAllSortedUserDetails } from "../../../Helper/Helper";
import { UserContext } from "../../../store/UserContext";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const { Search } = Input;

  const { setAllListings } = props;

  const { userInfo } = useContext(UserContext);

  const [searchText, setSearchText] = useState("");

  const filterBySearchText = (listings) => {
    if (searchText) {
      const searchTextLower = searchText.toLowerCase();
      const listingsAfterFilter = listings.filter(
        (listing) =>
          listing.address.city.toLowerCase() === searchTextLower ||
          listing.title.toLowerCase() == searchTextLower
      );
      return listingsAfterFilter;
    }
    return listings;
  };

  const onSearch = async () => {
    const listingDetails = await getAllSortedUserDetails(userInfo);
    // Filter by the searched text
    const listingAfterSearch = filterBySearchText(listingDetails);
    setAllListings(listingAfterSearch);
  };

  return (
    <div className={styles.searchBarContainer}>
      <Search
        className={styles.searchBar}
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        onChange={(event) => setSearchText(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;
