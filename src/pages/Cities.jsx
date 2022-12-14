import React from 'react';
import { useSelector } from 'react-redux';
import { MainPageLayout } from '../components';
import addIcon from '../assets/Add Subcategories.svg';
import { loadCities } from '../store/reducers/cities';

const Cities = () => {
  const cities = useSelector(state => state.cities.cities);
  return (
    <MainPageLayout
      path='cities'
      data={cities}
      route='city'
      deleteTitle='cities'
      action={loadCities()}
      title='Active Cities'
      addIcon={addIcon}
      desc
    />
  );
};

export default Cities;
