import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './selector.css';
const Selector = props => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!props.id) {
      props.setId('');
    }
  }, []);

  const changeIdHandler = e => {
    props.setId(e.target.value);
  };
  return (
    <div className='input-container custom-select'>
      <div className='input-label text-center'>{props.label}</div>
      <select
        onChange={changeIdHandler}
        value={props.id ? props.id : ''}
        placeholder=''>
        {!props.id && (
          <option
            value=''
            disabled
            defaultValue={props.id ? false : true}
            key={Math.round(Math.random() * 10000)}>
            {props.path === 'color' && t('chooseColor')}
            {props.path === 'size' && t('chooseSize')}
            {props.path === 'government' && t('chooseGovernment')}

            {props.path === 'country' && t('chooseCountry')}
            {!props.path && t('chooseCategory')}
          </option>
        )}

        {props.data.map(el => {
          // console.log(el);
          return (
            <option value={el.id} key={el.id}>
              {!props.path && `${el.englishName} - ${el.arabicName}`}
              {props.path === 'color' && `${el.name}`}
              {props.path === 'size' && `${el.name}`}
              {props.path === 'government' &&
                `${el.englishName} - ${el.arabicName}`}
              {/* {props.path === 'city' && `${el.englishName} - ${el.arabicName}`} */}
              {props.path === 'country' &&
                `${el.englishName} - ${el.arabicName}`}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Selector;
