import React from 'react';
import { useSelector } from 'react-redux';
import { MainPageLayout } from '../components';

import addIcon from '../assets/Add Subcategories.svg';
import { loadSubCategories } from '../store/reducers/subCategories';

const SubCategories = () => {
  const subCategories = useSelector(state => state.subCategories.subCategories);
  return (
    <MainPageLayout
      path='subCategories'
      data={subCategories}
      route='subcat'
      deleteTitle='subCategory'
      action={loadSubCategories()}
      addIcon={addIcon}
      image={{ title: 'Photo  الصورة', width: 320 }}
      arabicName={{ title: 'العنوان', width: 300 }}
      englishName={{ title: 'Title', width: 300 }}
      desc
    />
  );
};

export default SubCategories;
