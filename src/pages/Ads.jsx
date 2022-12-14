import React from 'react';
import { useSelector } from 'react-redux';

import { loadAds } from '../store/reducers/ads';
import addADIcon from '../assets/Add ADs.svg';
import { MainPageLayout } from '../components';
const Ads = () => {
  const ads = useSelector(state => state.ads.ads);

  return (
    <MainPageLayout
      path='ads'
      deleteTitle='ad'
      route='ads'
      data={ads}
      action={loadAds()}
      title='Active ADs'
      addIcon={addADIcon}
      image={{ title: 'Photo  الصورة', width: 260 }}
      arabicName={{ title: 'العنوان', width: 130 }}
      englishName={{ title: 'Title', width: 130 }}
      arabicDesc={{ title: 'Description', width: 270, hide: false }}
      englishDesc={{ title: 'الوصف', width: 270, hide: false }}
    />
  );
};

export default Ads;
