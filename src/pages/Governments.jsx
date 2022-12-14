import React from 'react';
import { useSelector } from 'react-redux';
import { MainPageLayout } from '../components';
import addIcon from '../assets/Add Subcategories.svg';
import { loadGovernments } from '../store/reducers/governments';

const Governments = () => {
  const governments = useSelector(state => state.governments.governments);
  return (
    <MainPageLayout
      path='governments'
      data={governments}
      route='governoment'
      deleteTitle='governments'
      action={loadGovernments()}
      title='Active Governments'
      addIcon={addIcon}
      desc
    />
  );
};

export default Governments;
