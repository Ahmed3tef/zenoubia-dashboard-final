import React, { useState } from 'react';
import UploadImg from './UploadImg';
import './UploadForm.css';
import MiniText from './MiniText';
import LargeText from './LargeText';

import { APIBase } from '../../store/reducers/api';

import uploadAndEdit from './upload-edit';

const UploadAds = ({ updatedPage, goBackHandler, token }) => {
  const [arabicName, setArabicName] = useState(
    updatedPage ? updatedPage.arabicName : ''
  );
  const [englishName, setEnglishName] = useState(
    updatedPage ? updatedPage.englishName : ''
  );
  const [arabicDesc, setArabicDesc] = useState(
    updatedPage ? updatedPage.arabicDesc : ''
  );
  const [englishDesc, setEnglishDesc] = useState(
    updatedPage ? updatedPage.englishDesc : ''
  );
  const [img, setImg] = useState(
    updatedPage ? APIBase + updatedPage.imgUrl : ''
  );
  const [imgAlt, setImgAlt] = useState(updatedPage ? updatedPage.imgAlt : '');

  const uploadADHandler = () => {
    const fd = new FormData();
    fd.append('image', img);
    fd.append('alt', imgAlt);
    fd.append('arabicName', arabicName);
    fd.append('englishName', englishName);
    fd.append('arabicDesc', arabicDesc);
    fd.append('englishDesc', englishDesc);
    const config = {
      headers: {
        authorization: token,
      },
      params: { id: updatedPage ? updatedPage.id : '' },
    };
    uploadAndEdit(updatedPage, 'ads', fd, config, goBackHandler, 'AD');
  };

  return (
    <div className='form-container'>
      <UploadImg
        existingImg={updatedPage ? updatedPage.imgUrl : null}
        setImg={setImg}
        setImgAlt={setImgAlt}
        title={['AD Photo', 'صورة الإعلان']}
      />
      <div className='text-container'>
        <MiniText
          placeholder='Add AD title here ...'
          label='AD Title'
          setName={setEnglishName}
          name={englishName}
        />
        <LargeText
          placeholder='Add AD description here ...'
          label='AD Description'
          desc={englishDesc}
          setDesc={setEnglishDesc}
        />
      </div>
      <div className='text-container'>
        <MiniText
          placeholder=' ...أضف عنوان الإعلان هنا'
          label='عنوان الإعلان'
          setName={setArabicName}
          name={arabicName}
          direction='rtl'
        />
        <LargeText
          placeholder=' ...أضف وصف الإعلان هنا'
          label='وصف الإعلان'
          desc={arabicDesc}
          setDesc={setArabicDesc}
          direction='rtl'
        />
      </div>
      <div className='form-btns'>
        <div className='form-btn' onClick={uploadADHandler}>
          {updatedPage ? 'Save' : 'Upload'}
        </div>
        <div className='form-btn' onClick={goBackHandler}>
          Cancel
        </div>
      </div>
    </div>
  );
};

export default UploadAds;
