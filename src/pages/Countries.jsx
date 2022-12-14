import React from 'react';
import { useSelector } from 'react-redux';
import { MainPageLayout } from '../components';

import addIcon from '../assets/Add Subcategories.svg';
import { loadCountries } from '../store/reducers/countries';
const Countries = () => {
  const countries = useSelector(state => state.countries.countries);
  return (
    <MainPageLayout
      path='countries'
      data={countries}
      route='country'
      deleteTitle='countries'
      action={loadCountries()}
      title='Active Countries'
      addIcon={addIcon}
      desc
    />
  );
};

export default Countries;
