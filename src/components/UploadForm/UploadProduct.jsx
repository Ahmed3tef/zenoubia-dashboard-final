import React, { useEffect, useState } from 'react';
import UploadImg from './UploadImg';
import './UploadForm.css';
import MiniText from './MiniText';

import uploadAndEdit from './upload-edit';
import Selector from './Selector';
import { useDispatch, useSelector } from 'react-redux';

import { loadSubCategories } from '../../store/reducers/subCategories';
import LargeText from './LargeText';

import { useTranslation } from 'react-i18next';

import { loadSizesAndColors } from '../../store/reducers/subCatSizeAndColor';

const UploadProduct = ({ updatedPage, goBackHandler, updatedType }) => {
  const { t } = useTranslation();
  const token = useSelector(state => state.auth.token);
  const colors = useSelector(state => state.subCatSizeAndColor.colors);
  const Subcategories = useSelector(state => state.subCategories.subCategories);
  const sizes = useSelector(state => state.subCatSizeAndColor.sizes);
  // IMAGES
  const [img, setImg] = useState(
    updatedPage && updatedPage.images ? updatedPage.images[0].imageUrl : ''
  );
  const [img2, setImg2] = useState(
    updatedPage && updatedPage.images.length > 1
      ? updatedPage.images[1].imageUrl
      : ''
  );
  const [img3, setImg3] = useState(
    updatedPage && updatedPage.images.length > 1
      ? updatedPage.images[2].imageUrl
      : ''
  );
  const [img4, setImg4] = useState(
    updatedPage && updatedPage.images.length > 3
      ? updatedPage.images[3].imageUrl
      : ''
  );

  // CAT AND SUB CAT

  const [subCatId, setSubCatId] = useState(
    updatedPage ? updatedPage.subcategory._id : ''
  );
  // NAMES
  const [arabicName, setArabicName] = useState(
    updatedPage ? updatedPage.name.arabic : ''
  );
  const [englishName, setEnglishName] = useState(
    updatedPage ? updatedPage.name.english : ''
  );
  const [arabicHeadText, setArabicHeadText] = useState(
    updatedPage ? updatedPage.headText.arabic : ''
  );
  const [englishHeadText, setEnglishHeadText] = useState(
    updatedPage ? updatedPage.headText.english : ''
  );
  const [arabicSubText, setArabicSubText] = useState(
    updatedPage ? updatedPage.subText.arabic : ''
  );
  const [englishSubText, setEnglishSubText] = useState(
    updatedPage ? updatedPage.subText.english : ''
  );
  const [arabicHintText, setArabicHintText] = useState(
    updatedPage ? updatedPage.hintText.arabic : ''
  );
  const [englishHintText, setEnglishHintText] = useState(
    updatedPage ? updatedPage.hintText.english : ''
  );
  const [arabicDesc, setArabicDesc] = useState(
    updatedPage &&
      updatedPage.arabicLargeDescription &&
      updatedPage.arabicLargeDescription[0].description
      ? updatedPage.arabicLargeDescription[0].description[0]
      : ''
  );
  const [arabicDescTitle, setArabicDescTitle] = useState(
    updatedPage && updatedPage.arabicLargeDescription
      ? updatedPage.arabicLargeDescription[0].headTitle
      : ''
  );
  const [englishDesc, setEnglishDesc] = useState(
    updatedPage && updatedPage.englishLargeDescription
      ? updatedPage.englishLargeDescription[0].headTitle
      : ''
  );
  const [englishDescTitle, setEnglishDescTitle] = useState(
    updatedPage && updatedPage.englishLargeDescription
      ? updatedPage.englishLargeDescription[0].headTitle
      : ''
  );

  // PRICES

  const [currentPrice1, setCurrentPrice1] = useState(
    updatedPage && updatedPage.prices ? updatedPage.prices[0].currentPrice : ''
  );
  const [currentPrice2, setCurrentPrice2] = useState(
    updatedPage && updatedPage.prices && updatedPage.prices[1]
      ? updatedPage.prices[1].currentPrice
      : ''
  );
  const [currentPrice3, setCurrentPrice3] = useState(
    updatedPage && updatedPage.prices && updatedPage.prices[2]
      ? updatedPage.prices[2].currentPrice
      : ''
  );
  const [currentPrice4, setCurrentPrice4] = useState(
    updatedPage && updatedPage.prices && updatedPage.prices[3]
      ? updatedPage.prices[3].currentPrice
      : ''
  );
  const [discountPrice1, setDiscountPrice1] = useState(
    updatedPage && updatedPage.prices ? updatedPage.prices[0].discountPrice : ''
  );
  const [discountPrice2, setDiscountPrice2] = useState(
    updatedPage && updatedPage.prices && updatedPage.prices[1]
      ? updatedPage.prices[1].discountPrice
      : ''
  );
  const [discountPrice3, setDiscountPrice3] = useState(
    updatedPage && updatedPage.prices && updatedPage.prices[2]
      ? updatedPage.prices[2].discountPrice
      : ''
  );
  const [discountPrice4, setDiscountPrice4] = useState(
    updatedPage && updatedPage.prices && updatedPage.prices[3]
      ? updatedPage.prices[3].discountPrice
      : ''
  );
  const [size1, setSize1] = useState(
    updatedPage &&
      updatedPage.prices &&
      updatedPage.prices[0] &&
      updatedPage.prices[0].size
      ? updatedPage.prices[0].size._id
      : ''
  );
  const [size2, setSize2] = useState(
    updatedPage &&
      updatedPage.prices &&
      updatedPage.prices[1] &&
      updatedPage.prices[1].size
      ? updatedPage.prices[1].size._id
      : ''
  );
  const [size3, setSize3] = useState(
    updatedPage &&
      updatedPage.prices &&
      updatedPage.prices[2] &&
      updatedPage.prices[2].size
      ? updatedPage.prices[2].size._id
      : ''
  );
  const [size4, setSize4] = useState(
    updatedPage &&
      updatedPage.prices &&
      updatedPage.prices[3] &&
      updatedPage.prices[3].size
      ? updatedPage.prices[3].size._id
      : ''
  );
  const [color, setColor] = useState(
    updatedPage && updatedPage.prices && updatedPage.prices[0]
      ? updatedPage.prices[0].color._id
      : ''
  );

  const [quantity1, setQuantity1] = useState(
    updatedPage && updatedPage.prices && updatedPage.prices[0]
      ? updatedPage.prices[0].quantity
      : ''
  );
  const [quantity2, setQuantity2] = useState(
    updatedPage && updatedPage.prices && updatedPage.prices[1]
      ? updatedPage.prices[1].quantity
      : ''
  );
  const [quantity3, setQuantity3] = useState(
    updatedPage && updatedPage.prices && updatedPage.prices[2]
      ? updatedPage.prices[2].quantity
      : ''
  );
  const [quantity4, setQuantity4] = useState(
    updatedPage && updatedPage.prices && updatedPage.prices[3]
      ? updatedPage.prices[3].quantity
      : ''
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSubCategories());
  }, []);
  useEffect(() => {
    if (subCatId) dispatch(loadSizesAndColors(subCatId));
  }, [subCatId]);

  // console.log(updatedType);
  const uploadADHandler = () => {
    const fd = new FormData();
    let prices = [];
    let descriptionsArabic = [];
    let descriptionsEnglish = [];
    let images = [];

    const config = {
      headers: {
        authorization: token,
      },
    };
    // put images date in an array
    if (img) images.push(img);
    if (img2) images.push(img2);
    if (img3) images.push(img3);
    if (img4) images.push(img4);

    // put prices
    if (currentPrice1 && size1 && color)
      prices.push({
        currentPrice: currentPrice1,
        sizeId: size1,
        discountPrice: discountPrice1 ? discountPrice1 : 0,
        quantity: quantity1 ? quantity1 : 0,
        colorId: color,
      });
    if (currentPrice2 && size2 && color)
      prices.push({
        currentPrice: currentPrice2,
        sizeId: size2,
        discountPrice: discountPrice2 ? discountPrice2 : 0,
        quantity: quantity2 ? quantity2 : 0,
        colorId: color,
      });
    if (currentPrice3 && size3 && color)
      prices.push({
        currentPrice: currentPrice3,
        sizeId: size3,
        discountPrice: discountPrice3 ? discountPrice3 : 0,
        quantity: quantity3 ? quantity3 : 0,
        colorId: color,
      });
    if (currentPrice4 && size4 && color)
      prices.push({
        currentPrice: currentPrice4,
        sizeId: size4,
        discountPrice: discountPrice4 ? discountPrice4 : 0,
        quantity: quantity4 ? quantity4 : 0,
        colorId: color,
      });

    // put description
    if (arabicDescTitle && arabicDesc)
      descriptionsArabic.push({
        headTitle: arabicDescTitle,
        description: [arabicDesc],
      });
    if (englishDesc && englishDescTitle) {
      let finalDescList = [];
      finalDescList.push(englishDesc);
      descriptionsEnglish.push({
        headTitle: englishDescTitle,
        description: finalDescList,
      });
    }

    if (updatedPage && updatedType === 'image') {
      images.forEach((e, i) => {
        fd.append(`image[${i}][image]`, e.image);
        fd.append(`image[${i}][productId]`, e.productId);
        fd.append(`image[${i}][index]`, i);
      });
      uploadAndEdit(
        updatedPage,
        'product',
        fd,
        config,
        goBackHandler,
        'Product Images',
        updatedType
      );
      return;
    }
    if (updatedPage && updatedType === 'text') {
      let data = {
        productId: updatedPage ? updatedPage.id : '',
        catId: '6361027359e79aeeb9cdf652',
        subcatId: subCatId,
        arabicName,
        englishName,
        alt: 'new alt',
        prices,
        arabicHeadText,
        englishHeadText,
        arabicSubText,
        englishSubText,
        arabicHintText,
        englishHintText,
        englishLargeDescription: descriptionsEnglish,
        arabicLargeDescription: descriptionsArabic,

        status: 1,
      };
      uploadAndEdit(
        updatedPage,
        'product',
        data,
        config,
        goBackHandler,
        'Product',
        updatedType
      );
      return;
      //
    } else {
      // fd.append('image', img);
      // images.forEach((e, i) => {
      //   fd.append(`image[${i}]`, e);
      // });
      if (img) fd.append('image', img);
      if (img2) fd.append('image', img2);
      if (img3) fd.append('image', img3);
      if (img4) fd.append('image', img4);
      fd.append('alt', 'product');

      fd.append('catId', '6361027359e79aeeb9cdf652');
      fd.append('subcatId', subCatId);

      fd.append('arabicName', arabicName);
      fd.append('englishName', englishName);

      fd.append('arabicHeadText', arabicHeadText);
      fd.append('englishHeadText', englishHeadText);

      fd.append('arabicSubText', arabicSubText);
      fd.append('englishSubText', englishSubText);

      fd.append('arabicHintText', arabicHintText);
      fd.append('englishHintText', englishHintText);

      descriptionsEnglish.forEach((e, i) => {
        fd.append(`englishLargeDescription[${i}][headTitle]`, e.headTitle);
        fd.append(
          `englishLargeDescription[${i}][description][0]`,
          e.description
        );
      });
      descriptionsArabic.forEach((e, i) => {
        fd.append(`arabicLargeDescription[${i}][headTitle]`, e.headTitle);
        fd.append(
          `arabicLargeDescription[${i}][description][0]`,
          e.description
        );
      });
      prices.forEach((e, i) => {
        fd.append(`prices[${i}][discountPrice]`, e.discountPrice);
        fd.append(`prices[${i}][currentPrice]`, e.currentPrice);
        fd.append(`prices[${i}][sizeId]`, e.sizeId);
        fd.append(`prices[${i}][colorId]`, e.colorId);
        fd.append(`prices[${i}][quantity]`, e.quantity);
      });
    }

    uploadAndEdit(null, 'product', fd, config, goBackHandler, 'Product', null);
  };

  return (
    <div className='product-container'>
      <div className='product-img'>
        <UploadImg
          product={true}
          existingImg={img}
          setImg={setImg}
          title={t('photo')}
        />
        <UploadImg product={true} existingImg={img2} setImg={setImg2} />
        <UploadImg product={true} existingImg={img3} setImg={setImg3} />
        <UploadImg product={true} existingImg={img4} setImg={setImg4} />
      </div>

      <div className='product-input'>
        <div className='selectors mb-5'>
          <div className='text-container mb-5 mt-5'>
            <Selector
              label={
                <>
                  <p>{t('category')}</p>
                </>
              }
              id={subCatId}
              setId={setSubCatId}
              data={Subcategories}
            />
          </div>
          <div className='text-container mb-5 mt-5'>
            <Selector
              label={
                <>
                  <p>Color - اللون</p>
                </>
              }
              id={color}
              setId={setColor}
              data={colors}
              path='color'
            />
          </div>
        </div>
        <div className='product-input-text mb-3 mt-3'>
          <MiniText
            placeholder='Add Product Name ...'
            label='Product Name'
            setName={setEnglishName}
            name={englishName}
          />
          <MiniText
            placeholder=' ...أضف اسم المُنتج'
            label='اسم المُنتج'
            direction='rtl'
            path='product'
            setName={setArabicName}
            name={arabicName}
          />
        </div>
        <div className='product-input-text mb-3'>
          <MiniText
            placeholder='Add Product Component ...'
            label='Product Component'
            setName={setEnglishHeadText}
            name={englishHeadText}
          />
          <MiniText
            placeholder=' ...أضف مُكونات المُنتج'
            label='مُكونات المُنتج'
            direction='rtl'
            path='product'
            setName={setArabicHeadText}
            name={arabicHeadText}
          />
        </div>
        <div className='product-input-text mb-3'>
          <MiniText
            placeholder='Add Product Benfit ...'
            label='Benefit'
            setName={setEnglishSubText}
            name={englishSubText}
          />
          <MiniText
            placeholder=' ...أضف فائدة المُنتج'
            label='الفائدة'
            direction='rtl'
            path='product'
            setName={setArabicSubText}
            name={arabicSubText}
          />
        </div>
        <div className='product-prices-content'>
          <div className='product-prices'>
            <MiniText
              classes='me-5'
              placeholder='Add Weight ...'
              label={`price - السعر`}
              setName={setCurrentPrice1}
              name={currentPrice1}
            />
            <MiniText
              classes='me-5'
              placeholder='Add Price ...'
              label={`discount - الخصم`}
              setName={setDiscountPrice1}
              name={discountPrice1}
            />
            <MiniText
              classes='me-5'
              placeholder='Add Price ...'
              label={`Quantity - الكمية`}
              setName={setQuantity1}
              name={quantity1}
            />
            <Selector
              path='size'
              classes='me-5'
              label={`Size`}
              id={size1}
              setId={setSize1}
              data={sizes}
            />
          </div>
          <div className='product-prices'>
            <MiniText
              classes='me-5'
              placeholder='Add Weight ...'
              label={`price - السعر`}
              setName={setCurrentPrice2}
              name={currentPrice2}
            />
            <MiniText
              classes='me-5'
              placeholder='Add Price ...'
              label={`discount - الخصم`}
              setName={setDiscountPrice2}
              name={discountPrice2}
            />
            <MiniText
              classes='me-5'
              placeholder='Add Price ...'
              label={`Quantity - الكمية`}
              setName={setQuantity2}
              name={quantity2}
            />
            <Selector
              path='size'
              classes='me-5'
              label={`Size`}
              id={size2}
              setId={setSize2}
              data={sizes}
            />
          </div>
          <div className='product-prices'>
            <MiniText
              classes='me-5'
              placeholder='Add Weight ...'
              label={`price - السعر`}
              setName={setCurrentPrice3}
              name={currentPrice3}
            />
            <MiniText
              classes='me-5'
              placeholder='Add Price ...'
              label={`discount - الخصم`}
              setName={setDiscountPrice3}
              name={discountPrice3}
            />
            <MiniText
              classes='me-5'
              placeholder='Add Price ...'
              label={`Quantity - الكمية`}
              setName={setQuantity3}
              name={quantity3}
            />
            <Selector
              path='size'
              classes='me-5'
              label={`Size`}
              id={size3}
              setId={setSize3}
              data={sizes}
            />
          </div>
          <div className='product-prices'>
            <MiniText
              classes='me-5'
              placeholder='Add Weight ...'
              label={`price - السعر`}
              setName={setCurrentPrice4}
              name={currentPrice4}
            />
            <MiniText
              classes='me-5'
              placeholder='Add Price ...'
              label={`discount - الخصم`}
              setName={setDiscountPrice4}
              name={discountPrice4}
            />
            <MiniText
              classes='me-5'
              placeholder='Add Price ...'
              label={`Quantity - الكمية`}
              setName={setQuantity4}
              name={quantity4}
            />
            <Selector
              path='size'
              classes='me-5'
              label={`Size`}
              id={size4}
              setId={setSize4}
              data={sizes}
            />
          </div>
        </div>
        <div className='product-small-desc'>
          <LargeText
            classes='mb-5'
            placeholder='Add Short Description ...'
            label='Short Description'
            desc={englishHintText}
            setDesc={setEnglishHintText}
          />
          <LargeText
            placeholder=' ...أضف وصف مُختصر للمُنتج'
            label='وصف مُختصر'
            direction='rtl'
            desc={arabicHintText}
            setDesc={setArabicHintText}
          />
        </div>
        <div className='product-desc-container mb-5'>
          <div className='container-title'>Product Description</div>
          <div className='product-desc'>
            <MiniText
              classes='mb-3 mt-5'
              placeholder='Add  Title ...'
              // btn='Title'
              label='Title'
              path='product'
              setName={setEnglishDescTitle}
              name={englishDescTitle}
            />
            <LargeText
              placeholder='Add Description ...'
              // btn='Description'
              label='Description'
              desc={englishDesc}
              setDesc={setEnglishDesc}
            />
          </div>
        </div>
        <div className='product-desc-container mb-5'>
          <div className='product-desc'>
            <MiniText
              classes='mb-3 mt-5'
              placeholder='...أضف العنوان'
              // btn='العنوان'
              path='product'
              label='العنوان'
              setName={setArabicDescTitle}
              name={arabicDescTitle}
              direction='rtl'
              turnText={false}
            />
            <LargeText
              placeholder=' ...أضف الوصف '
              // btn='الوصف'
              label='الوصف'
              desc={arabicDesc}
              setDesc={setArabicDesc}
              direction='rtl'
            />
          </div>
        </div>

        <div className='form-btns mt-5'>
          <div className='form-btn' onClick={uploadADHandler}>
            {updatedPage ? 'Save' : 'Upload'}
          </div>
          <div className='form-btn' onClick={goBackHandler}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;
