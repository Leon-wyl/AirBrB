import { DatePicker, Input, message, Select, Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  compareSortBy, getAllDatesBetweenDates, getAllSortedUserDetails
} from '../../../Helper/Helper';
import styles from './SearchBar.module.css';

const SearchBar = (props) => {
  const { Search } = Input;
  const { Text } = Typography;
  const { RangePicker } = DatePicker;

  const { setAllListings, setDateRange } = props;

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('None');
  const [maxFilter, setMaxFilter] = useState('');
  const [minFilter, setMinFilter] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const onChangeFilter = (value) => {
    setFilter(value);
    setMaxFilter('');
    setMinFilter('');
    if (value !== 'Date') setDateRange(0);
  };

  const onChangeDates = (date) => {
    if (date) {
      setMaxFilter(date[1]);
      setMinFilter(date[0]);
    } else {
      setMaxFilter('');
      setMinFilter('');
      setDateRange(0);
    }
  };

  const onSearch = async () => {
    const listingDetails = await getAllSortedUserDetails(email, token);
    const publishedListings = listingDetails.filter(
      (listing) => listing.published
    );
    // Filter by the searched text
    const listingAfterSearch = filterBySearchText(publishedListings);
    let listingAfterFilter = [];
    switch (filter) {
      case 'Date':
        listingAfterFilter = filterByDates(listingAfterSearch);
        break;
      case 'Number of Bedrooms':
        listingAfterFilter = filterByBedroom(listingAfterSearch);
        break;
      case 'Price':
        listingAfterFilter = filterByPrice(listingAfterSearch);
        break;
      default:
        listingAfterFilter = listingAfterSearch;
    }
    let listingAfterSortBy = [];
    switch (sortBy) {
      case 'Increase Rating':
        listingAfterSortBy = listingAfterFilter.sort(compareSortBy('increase'));
        break;
      case 'Decrease Rating':
        listingAfterSortBy = listingAfterFilter.sort(compareSortBy('decrease'));
        break;
      default:
        listingAfterSortBy = listingAfterFilter;
    }
    setAllListings(listingAfterSortBy);
  };

  const filterBySearchText = (listings) => {
    if (searchText) {
      const searchTextLower = searchText.toLowerCase();
      const listingsAfterFilter = listings.filter((listing) => {
        const cityLower = listing.address.city.toLowerCase();
        const titleLower = listing.title.toLowerCase();
        return (
          cityLower.includes(searchTextLower) ||
          titleLower.includes(searchTextLower)
        );
      });
      return listingsAfterFilter;
    }
    return listings;
  };

  const filterByBedroom = (listings) => {
    const maxNum = parseInt(maxFilter);
    const minNum = parseInt(minFilter);
    if (maxNum && minNum) {
      const result = listings.filter((listing) => {
        const numBedroom = listing.metadata.numBedroom;
        return numBedroom >= minNum && numBedroom <= maxNum;
      });
      return result;
    } else {
      message.error('Please Enter a valid number');
      return listings;
    }
  };

  const filterByPrice = (listings) => {
    const maxNum = parseInt(maxFilter);
    const minNum = parseInt(minFilter);
    if (maxNum && minNum) {
      const result = listings.filter((listing) => {
        const price = listing.price;
        return price >= minNum && price <= maxNum;
      });
      return result;
    } else {
      message.error('Please Enter a valid price');
      return listings;
    }
  };

  const filterByDates = (listings) => {
    const maxDate = maxFilter;
    const minDate = minFilter;
    if (maxDate && maxDate) {
      // Get date range
      const diffInDates = maxFilter.diff(minFilter, 'days');
      diffInDates === 0 ? setDateRange(0) : setDateRange(diffInDates);
      // Get all dates being filtered in
      const filteredDatesWithDups = getAllDatesBetweenDates(minDate, maxDate);
      const filteredDates = [...new Set(filteredDatesWithDups)];
      // Get all listing that satisfies the filtered dates
      const filteredListings = listings.filter((listing) => {
        const availableDatesWithDups = [];
        const availabilities = listing.availability;
        // If the listing has no availabilities, filter it out
        if (availabilities === []) return false;
        // For all availability ranges, get all dates and put them in an array
        availabilities.forEach((availability) => {
          const availableDatesForPeriod = getAllDatesBetweenDates(
            moment(availability.start),
            moment(availability.end)
          );
          availableDatesWithDups.push(...availableDatesForPeriod);
        });
        const availableDates = [...new Set(availableDatesWithDups)];
        // Check is all filtered dates are available, if not, exclude it
        let isAllInAvailableDates = true;
        filteredDates.forEach((filteredDate) => {
          if (!availableDates.includes(filteredDate)) { isAllInAvailableDates = false; }
        });
        return isAllInAvailableDates;
      });
      return filteredListings;
    } else {
      message.error('Please Enter a valid date range');
      return listings;
    }
  };

  return (
    <div className={styles.searchContainer}>
      <Search
        className={styles.searchBar}
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        onChange={(event) => setSearchText(event.target.value)}
      />
      <div className={styles.optionsContainer}>
        <div className={styles.option}>
          <Text className={styles.filterTitle}>Filter By:</Text>
          <Select
            size="large"
            defaultValue="None"
            style={{ width: '210px' }}
            onChange={onChangeFilter}
            options={[
              {
                value: 'None',
                label: 'None',
              },
              {
                value: 'Number of Bedrooms',
                label: 'Number of Bedrooms',
              },
              {
                value: 'Date',
                label: 'Date',
              },
              {
                value: 'Price',
                label: 'Price',
              },
            ]}
          />
        </div>
        <div className={styles.option}>
          <Text className={styles.filterTitle}>Sort By:</Text>
          <Select
            size="large"
            defaultValue="Default"
            style={{ width: '210px' }}
            onChange={(value) => setSortBy(value)}
            options={[
              {
                value: 'Default',
                label: 'Default',
              },
              {
                value: 'Decrease Rating',
                label: 'Decrease Rating',
              },
              {
                value: 'Increase Rating',
                label: 'Increase Rating',
              },
            ]}
          />
        </div>
      </div>
      {(filter === 'Number of Bedrooms' || filter === 'Price') && (
        <div className={styles.optionsContainer}>
          <div className={styles.option}>
            <Text className={styles.maxTitle}>Max:</Text>
            <Input
              style={{ width: '210px' }}
              size="large"
              placeholder={`Max ${filter}`}
              onChange={(event) => setMaxFilter(event.target.value)}
            />
          </div>
          <div className={styles.option}>
            <Text className={styles.minTitle}>Min:</Text>
            <Input
              style={{ width: '210px' }}
              size="large"
              placeholder={`Min ${filter}`}
              onChange={(event) => setMinFilter(event.target.value)}
            />
          </div>
        </div>
      )}
      {filter === 'Date' && (
        <div className={styles.optionsContainer}>
          <div className={styles.option}>
            <RangePicker
              disabledDate={(currentDate) =>
                currentDate <= moment().subtract(1, 'd')
              }
              onChange={onChangeDates}
            />
          </div>
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  setAllListings: PropTypes.func,
  setDateRange: PropTypes.func,
}

export default SearchBar;
