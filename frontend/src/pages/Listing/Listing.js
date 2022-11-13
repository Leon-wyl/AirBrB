import React, { useState, useEffect } from 'react';
import { getListingWithId } from '../../api/ListingApi';
import ImageGallery from 'react-image-gallery';
import styles from './Listing.module.css';
import Gallery from 'react-photo-gallery';
import {Card} from 'antd'

const Listing = () => {
  const [data, setData] = useState({});
  useEffect(async () => {
    const listingId = window.location.href.split('/')[4];
    const listingRes = await getListingWithId(listingId);
    const listingDetail = listingRes.data.listing;
    setData(listingDetail);
  }, []);

  console.log(data);
  // const thumbnail = [
  //   {
  //     src: data?.thumbnail,
  //   },
  // ];
  // const otherImages = data?.metadata?.imageGallery
  //   ? data?.metadata?.imageGallery?.map((dataUrl) => {
  //       return {
  //         src: dataUrl,
  //       };
  //     })
  //   : [];
  // const photos = thumbnail.concat(otherImages);

  // const thumbnail = [
  //   {
  //     original: data?.thumbnail,
	// 		thumbnail: data?.thumbnail,
  //   },
  // ];
  // const otherImages = data?.metadata?.imageGallery
  //   ? data?.metadata?.imageGallery?.map((dataUrl) => {
  //       return {
  //         original: dataUrl,
	// 				thumbnail: dataUrl,
  //       };
  //     })
  //   : [];
  // const photos = thumbnail.concat(otherImages);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
			<Card
        hoverable={true}
        className={styles.card}
        style={{
          width: 300,
        }}
        cover={<img alt={`thumbnail-${data.id}`} src={data.thumbnail} />}
        onClick={() => history.push(`/listing/${data.id}`)}
      >
			</Card>
      </div>
    </div>
  );
};

export default Listing;
