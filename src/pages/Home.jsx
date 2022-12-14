import React from 'react';

import { ReportsLayout } from '../components';
import './Home.css';
const Home = () => {
  return (
    <>
      <h1 className='reports__heading'>Welcome , Hatem El-Shawaf.</h1>
      <ReportsLayout title={true} />
    </>
  );
};

export default Home;
