import React from 'react';

import { MainTable, Search } from '../';
import './MainTablePage.css';
const MainTablePage = props => {
  // const titleMB = props.path === 'orders' ? '0' : '-10rem';
  // const titleMT = props.path === 'orders' ? '6rem' : '0';
  return (
    <div className='table__container'>
      {props.addIcon && (
        <div className='table__header'>
          <div className='table-header'>{/* <span>{props.title}</span> */}</div>
          {props.path === 'products' && (
            <Search route={props.route} title={props.path} />
          )}
          {props.addIcon && (
            <div className='add-icon ' onClick={props.showAddHandler}>
              <img className='w-32' src={props.addIcon} alt='add icon' />
            </div>
          )}
        </div>
      )}

      <MainTable
        token={props.token}
        path={props.path}
        data={props.data}
        updatedPage={props.updatedPage}
        setShowAddAD={props.setShowAddPage}
        setUpdatedPage={props.setUpdatedPage}
        setUpdatedType={props.setUpdatedType}
        image={props.image}
        englishName={props.englishName}
        arabicName={props.arabicName}
        arabicDesc={props.arabicDesc}
        englishDesc={props.englishDesc}
        setItemId={props.setItemId}
        setOverlay={props.setOverlay}
        setShowReviews={props.setShowReviews}
        action={props.action}
      />
    </div>
  );
};

export default MainTablePage;
