import React, { useEffect, useState } from 'react';

import backIcon from '../../assets/backIcon.svg';
import './MainPageLayout.css';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  MainTablePage,
  UploadAds,
  UploadCategory,
  UploadCountry,
  UploadGovernment,
  UploadProduct,
  UploadSubCategory,
  UploadCity,
} from '..';
import axios from 'axios';
import { APIBase } from '../../store/reducers/api';
import { Reviews } from '../../pages';
import { useTranslation } from 'react-i18next';
import { Fade } from '@mui/material';

const MainPageLayout = (props) => {
  const { t } = useTranslation();
  const token = useSelector((state) => state.auth.token);
  const [showAddPage, setShowAddPage] = useState(false);
  const [updatedPage, setUpdatedPage] = useState(null);
  const [updatedType, setUpdatedType] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [itemId, setItemId] = useState('');
  const dispatch = useDispatch();

  const showAddHandler = () => {
    setShowReviews(false);

    setUpdatedPage(null);
    setShowAddPage(true);
  };
  const goBackHandler = () => {
    dispatch(props.action);
    setShowAddPage(false);
    setShowReviews(false);
  };
  const showReviewsHandler = () => {
    setShowAddPage(true);
    setShowReviews(true);
  };

  useEffect(() => {
    dispatch(props.action);
  }, []);

  const deleteHandler = () => {
    const fd = new FormData();

    fd.append('status', 0);

    const config = {
      headers: {
        authorization: token,
      },
      params: { id: itemId ? itemId : '' },
    };

    if (
      props.route === 'city' ||
      props.route === 'governoment' ||
      props.route === 'country'
    ) {
      axios
        .patch(
          `${APIBase}${props.route}/update`,
          { id: itemId ? itemId : '', status: 0 },
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then(() => {
          dispatch(props.action);
          setOverlay(false);
        })
        .catch((err) => console.log(err));

      return;
    } else if (props.route === `ads`)
      axios.delete(`${APIBase}${props.route}`, config);
    else if (props.route === `contactus`) {
      axios.delete(`${APIBase}${props.route}/deleteone`, config).then(() => {
        dispatch(props.action);
        setOverlay(false);
        return;
      });
    } else if (props.route === `product`) {
      axios
        .patch(
          `${APIBase}${props.route}/update`,
          { productId: itemId ? itemId : '', status: 0 },
          {
            headers: {
              authorization: token,
            },
          }
        )
        .catch((err) => console.log(err));
    } else axios.patch(`${APIBase}${props.route}/update`, fd, config);

    dispatch(props.action);
    setOverlay(false);
  };

  return (
    <>
      {!showAddPage && (
        <MainTablePage
          token={token}
          path={props.path}
          route={props.route}
          title={props.title}
          setShowAddPage={setShowAddPage}
          showAddHandler={showAddHandler}
          setUpdatedPage={setUpdatedPage}
          setUpdatedType={setUpdatedType}
          setShowReviews={showReviewsHandler}
          updatedPage={updatedPage}
          setOverlay={setOverlay}
          setItemId={setItemId}
          data={props.data}
          action={props.action}
          addIcon={props.addIcon}
          image={props.image}
          arabicName={props.arabicName}
          englishName={props.englishName}
          arabicDesc={props.arabicDesc}
          englishDesc={props.englishDesc}
        />
      )}

      <Fade in={overlay} timeout={700}>
        <div className="delete-overlay">
          <div className="delete-overlay-content">
            <h3 className="overlay-header">
              {`Are you sure you want to permanently delete this ${props.deleteTitle}?`}
            </h3>
            <div className="overlay-btns">
              <div className="overlay-btn" onClick={deleteHandler}>
                {t('yes')}
              </div>
              <div className="overlay-btn" onClick={() => setOverlay(false)}>
                {t('no')}
              </div>
            </div>
          </div>
        </div>
      </Fade>

      {showAddPage && (
        <Container className="h-100">
          <div className="w-24 h-24 rtl:rotate-180" onClick={goBackHandler}>
            <img src={backIcon} alt="back icon" />
          </div>
          {props.path === 'ads' && (
            <UploadAds
              token={token}
              updatedPage={updatedPage}
              goBackHandler={goBackHandler}
            />
          )}
          {props.path === 'categories' && (
            <UploadCategory
              token={token}
              updatedPage={updatedPage}
              goBackHandler={goBackHandler}
            />
          )}
          {props.path === 'subCategories' && (
            <UploadSubCategory
              token={token}
              updatedPage={updatedPage}
              goBackHandler={goBackHandler}
            />
          )}
          {props.path === 'countries' && (
            <UploadCountry
              token={token}
              updatedPage={updatedPage}
              goBackHandler={goBackHandler}
            />
          )}
          {props.path === 'governments' && (
            <UploadGovernment
              token={token}
              updatedPage={updatedPage}
              goBackHandler={goBackHandler}
            />
          )}
          {props.path === 'cities' && (
            <UploadCity
              token={token}
              updatedPage={updatedPage}
              goBackHandler={goBackHandler}
            />
          )}
          {props.path === 'products' && !showReviews && (
            <UploadProduct
              token={token}
              updatedPage={updatedPage}
              goBackHandler={goBackHandler}
              updatedType={updatedType}
            />
          )}
          {showReviews && (
            <Reviews
              token={token}
              updatedPage={updatedPage}
              goBackHandler={goBackHandler}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default MainPageLayout;
