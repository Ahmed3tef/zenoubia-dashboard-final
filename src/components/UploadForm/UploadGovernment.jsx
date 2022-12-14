import React, { useEffect, useState } from 'react';

import './UploadForm.css';
import MiniText from './MiniText';

import uploadAndEdit from './upload-edit';
import Selector from './Selector';
import { useDispatch, useSelector } from 'react-redux';
import { loadCountries } from '../../store/reducers/countries';
import { useTranslation } from 'react-i18next';

const UploadGovernment = ({ updatedPage, goBackHandler, token }) => {
  const { t } = useTranslation();
  const [arabicName, setArabicName] = useState(
    updatedPage ? updatedPage.arabicName : ''
  );
  const [englishName, setEnglishName] = useState(
    updatedPage ? updatedPage.englishName : ''
  );

  const [countryId, setCountryId] = useState(
    updatedPage && updatedPage.country ? updatedPage.country._id : ''
  );
  // updatedPage ? updatedPage.countryId : ''
  const countries = useSelector(state => state.countries.countries);

  const dispatch = useDispatch();
  const uploadADHandler = () => {
    const data = updatedPage
      ? { id: updatedPage.id, arabicName, englishName, countryId }
      : { arabicName, englishName, countryId };
    const config = {
      headers: {
        authorization: token,
      },
    };
    uploadAndEdit(
      updatedPage,
      'governoment',
      data,
      config,
      goBackHandler,
      'governoment',
      'text'
    );
  };
  useEffect(() => {
    dispatch(loadCountries());
  }, []);

  return (
    <div className='form-container'>
      <div className='text-container'>
        <Selector
          label={
            <>
              <p>{t('country')}</p>
            </>
          }
          id={countryId}
          setId={setCountryId}
          data={countries}
          path='country'
          placeholder={t('chooseCountry')}
        />
        <MiniText
          placeholder={t('enterName')}
          label={t('englishName')}
          setName={setEnglishName}
          name={englishName}
        />
        <MiniText
          placeholder={t('enterName')}
          label={t('arabicName')}
          setName={setArabicName}
          name={arabicName}
          // direction='rtl'
        />
      </div>
      <div className='form-btns'>
        <div className='form-btn' onClick={uploadADHandler}>
          {updatedPage ? t('btnUpdate') : t('btnUpload')}
        </div>
        <div className='form-btn' onClick={goBackHandler}>
          {t('btnCancel')}
        </div>
      </div>
    </div>
  );
};

export default UploadGovernment;
