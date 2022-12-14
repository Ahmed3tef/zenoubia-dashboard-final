import React, { useState } from 'react';
import UploadImg from './UploadImg';
import './UploadForm.css';
import MiniText from './MiniText';
import { APIBase } from '../../store/reducers/api';
import uploadAndEdit from './upload-edit';

import { loadCategories } from '../../store/reducers/categories';
import { useDispatch, useSelector } from 'react-redux';
import { loadColors } from '../../store/reducers/colors';
import { loadSizes } from '../../store/reducers/sizes';
import { useTranslation } from 'react-i18next';

const UploadSubCategory = ({ updatedPage, goBackHandler, token }) => {
  const { t } = useTranslation();
  const colors = useSelector((state) => state.colors.colors);
  const sizes = useSelector((state) => state.sizes.sizes);

  const [arabicName, setArabicName] = useState(
    updatedPage ? updatedPage.arabicName : ''
  );
  const [englishName, setEnglishName] = useState(
    updatedPage ? updatedPage.englishName : ''
  );
  // const [catId, setCatId] = useState(
  //   updatedPage ? updatedPage.category.id : ''
  // );
  // console.log(updatedPage);
  const [colorId, setColorId] = useState(
    updatedPage ? updatedPage.colorsId : []
  );

  const [sizeId, setSizeId] = useState(updatedPage ? updatedPage.sizesId : []);

  const [img, setImg] = useState(
    updatedPage ? APIBase + updatedPage.imgUrl : ''
  );
  const [imgAlt, setImgAlt] = useState(updatedPage ? updatedPage.imgAlt : '');

  const dispatch = useDispatch();
  useState(() => {
    dispatch(loadCategories());
    dispatch(loadColors());
    dispatch(loadSizes());
  }, []);

  const addColorHandler = (e, id) => {
    let resultArray = [];
    if (e.target.checked) {
      resultArray = colorId.filter((CheckedId) => CheckedId !== id);
      resultArray.push(id);
    } else {
      resultArray = colorId.filter((CheckedId) => CheckedId !== id);
    }
    setColorId(resultArray);
  };

  const addSizeHandler = (e, id) => {
    let resultArray = [];
    if (e.target.checked) {
      resultArray = sizeId && sizeId.filter((CheckedId) => CheckedId !== id);
      resultArray.push(id);
    } else {
      resultArray = sizeId && sizeId.filter((CheckedId) => CheckedId !== id);
    }
    setSizeId(resultArray);
  };

  const uploadADHandler = () => {
    const fd = new FormData();
    fd.append('image', img);
    fd.append('alt', imgAlt);
    fd.append('arabicName', arabicName);
    fd.append('englishName', englishName);
    fd.append('catId', '6361027359e79aeeb9cdf652');

    colorId.forEach((color, i) => {
      fd.append(`colorList[${i}]`, color);
    });
    sizeId.forEach((size, i) => {
      fd.append(`sizeList[${i}]`, size);
    });
    const config = {
      headers: {
        authorization: token,
      },
      params: { id: updatedPage ? updatedPage.id : '' },
    };
    uploadAndEdit(
      updatedPage ? updatedPage : null,
      'subcat',
      fd,
      config,
      goBackHandler,
      'Subcategory'
    );
  };
  // useEffect(() => {
  //   if (sizes) setSizeId(updatedPage.sizeId);
  // }, [colors, sizes]);

  return (
    <div className="form-container">
      <UploadImg
        existingImg={updatedPage ? updatedPage.imgUrl : null}
        setImg={setImg}
        setImgAlt={setImgAlt}
        title={t('photo')}
      />
      <div className="mt-3 mb-3 text-container">
        <MiniText
          placeholder={t('enterName')}
          label={t('englishName')}
          setName={setEnglishName}
          name={englishName}
        />
      </div>
      <div className="mt-3 mb-3 text-container">
        <MiniText
          placeholder={t('enterName')}
          label={t('arabicName')}
          setName={setArabicName}
          name={arabicName}
          // direction='rtl'
        />
      </div>
      <div
        className="mt-3 mb-3 text-container "
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div
          className="input-label"
          style={{
            width: '15%',
          }}
        >
          <p>{t('colors')}</p>
        </div>
        <ul className="selection__content">
          {colors.map((c, index) => (
            <li className="selection__link" key={c.id}>
              <label
                className="flex items-center justify-center gap-4"
                style={{ cursor: 'pointer' }}
              >
                <input
                  type="checkbox"
                  name={c.name}
                  id={c.id}
                  value={c.id}
                  checked={colorId.includes(c.id)}
                  onChange={(event) => addColorHandler(event, c.id)}
                />
                <span>{c.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="mt-3 mb-3 text-container"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="input-label"
          style={{
            width: '15%',
          }}
        >
          <p>{t('sizes')}</p>
        </div>
        <ul className="selection__content">
          {sizes.map((c, index) => (
            <li className="selection__link" key={c.id}>
              <label
                className="flex items-center justify-center gap-4"
                style={{ cursor: 'pointer' }}
              >
                <input
                  type="checkbox"
                  name={c.name}
                  id={c.id}
                  value={c.id}
                  checked={sizeId.includes(c.id)}
                  onChange={(event) => addSizeHandler(event, c.id)}
                />
                <span>{c.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 form-btns">
        <div className="form-btn" onClick={uploadADHandler}>
          {updatedPage ? t('btnUpdate') : t('btnUpload')}
        </div>
        <div className="form-btn" onClick={goBackHandler}>
          {t('btnCancel')}
        </div>
      </div>
    </div>
  );
};

export default UploadSubCategory;
