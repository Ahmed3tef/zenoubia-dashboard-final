import React from 'react';
import { useSelector } from 'react-redux';
import { MainPageLayout } from '../components';
import { loadCategories } from '../store/reducers/categories';
import addIcon from '../assets/Add Category.svg';

const Categories = () => {
  const categories = useSelector(state => state.categories.categories);
  return (
    <MainPageLayout
      path='categories'
      deleteTitle='category'
      route='cat'
      data={categories}
      action={loadCategories()}
      title='Active Categories'
      addIcon={addIcon}
      image={{ title: 'Photo  الصورة ', width: 400 }}
      arabicName={{ title: 'العنوان', width: 300 }}
      englishName={{ title: 'Title', width: 300 }}
    />
  );
};

export default Categories;
