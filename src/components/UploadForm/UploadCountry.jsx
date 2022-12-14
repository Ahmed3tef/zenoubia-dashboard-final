import React, { useState } from 'react';

import './UploadForm.css';
import MiniText from './MiniText';

import uploadAndEdit from './upload-edit';
import { useTranslation } from 'react-i18next';

const UploadCountry = ({ updatedPage, goBackHandler, token }) => {
  const { t } = useTranslation();
  const [arabicName, setArabicName] = useState(
    updatedPage ? updatedPage.arabicName : ''
  );
  const [englishName, setEnglishName] = useState(
    updatedPage ? updatedPage.englishName : ''
  );

  const uploadCountryHandler = () => {
    const data = updatedPage
      ? { id: updatedPage.id, arabicName, englishName }
      : { arabicName, englishName };
    const config = {
      headers: {
        authorization: token,
      },
    };
    uploadAndEdit(
      updatedPage,
      'country',
      data,
      config,
      goBackHandler,
      'Country',
      'text'
    );
  };

  return (
    <div className='form-container'>
      <div className='text-container'>
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
          direction='rtl'
        />
      </div>
      <div className='form-btns'>
        <div className='form-btn' onClick={uploadCountryHandler}>
          {updatedPage ? t('btnUpdate') : t('btnUpload')}
        </div>
        <div className='form-btn' onClick={goBackHandler}>
          {t('btnCancel')}
        </div>
      </div>
    </div>
  );
};

export default UploadCountry;
