import React, { useEffect, useState } from 'react';
import { loadGovernments } from '../../store/reducers/governments';
import './UploadForm.css';
import MiniText from './MiniText';
import uploadAndEdit from './upload-edit';
import Selector from './Selector';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const UploadCity = ({ updatedPage, goBackHandler, token }) => {
  const { t } = useTranslation();
  const [arabicName, setArabicName] = useState(
    updatedPage ? updatedPage.arabicName : ''
  );
  const [englishName, setEnglishName] = useState(
    updatedPage ? updatedPage.englishName : ''
  );

  const [governmentId, setGovernmentId] = useState(
    updatedPage ? updatedPage.id : ''
  );

  const governments = useSelector(state => state.governments.governments);

  const dispatch = useDispatch();
  const uploadADHandler = () => {
    const data = updatedPage
      ? {
          id: updatedPage.id,
          arabicName,
          englishName,
          governomentId: governmentId,
        }
      : { arabicName, englishName, governomentId: governmentId };
    const config = {
      headers: {
        authorization: token,
      },
    };
    uploadAndEdit(
      updatedPage,
      'city',
      data,
      config,
      goBackHandler,
      'city',
      'text'
    );
  };

  useEffect(() => {
    dispatch(loadGovernments());
  }, []);

  return (
    <div className='form-container'>
      <div className='text-container'>
        <Selector
          label={
            <>
              <p>{t('government')}</p>
            </>
          }
          id={governmentId}
          setId={setGovernmentId}
          data={governments}
          path='government'
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

export default UploadCity;
