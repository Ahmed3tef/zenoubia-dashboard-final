import React from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import './mainTable.css';
import { useDispatch } from 'react-redux';
import { APIBase } from '../../store/reducers/api';
import editIcon from '../../assets/Edit.svg';
import deleteIcon from '../../assets/Delete.svg';
import reviewsIcon from '../../assets/Product Reviews.svg';
import editImgIcon from '../../assets/Product Details.svg';
import acceptOrderIcon from '../../assets/Accept Order.svg';
import rejectOrderIcon from '../../assets/Reject Order.svg';
import subCatImage from '../../assets/8.png';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function generateRandom() {
  var length = 8,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    retVal = '';
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

const MainTable = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const englishName = t('englishName');
  const arabicName = t('arabicName');
  const photo = t('photo');
  const actions = t('actions');
  const countryArabic = t('countryArabic');
  const countryEnglish = t('countryEnglish');
  const governmentArabic = t('governmentArabic');
  const governmentEnglish = t('governmentEnglish');
  const email = t('email');
  const subject = t('subject');
  const message = t('message');
  const name = t('userName');
  const category = t('category');

  let height = '90%';

  let cols;

  if (props.path === 'products') {
    cols = [
      // {
      //   field: 'id',
      //   headerName: 'id',
      //   hide: true,
      //   renderCell: index => index.api.getRowIndex(index.row.id),
      // },
      // {
      //   field: 'position',
      //   headerName: '#',
      //   width: 60,
      //   headerAlign: 'center',
      //   align: 'center',
      //   sortable: false,
      // },
      {
        field: 'imgUrl',
        headerName: photo,
        flex: 1,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
          return (
            <div className="p-img" key={'img-' + params.row.id}>
              <img
                src={`${APIBase}${params.row.imgUrl}`}
                alt={params.row.imgAlt}
              />
            </div>
          );
        },
      },
      {
        field: 'names',
        headerName: name,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => {
          return (
            <div key={'names-' + row.id}>
              <p>{`${row.name.english}`}</p>
              <p>{`${row.name.arabic}`}</p>
            </div>
          );
        },
      },
      // {
      //   field: 'category',
      //   headerName: 'Category',
      //   headerAlign: 'center',
      //   align: 'center',
      //   flex: 1,
      //   renderCell: ({ row }) => {
      //     return (
      //       <div>
      //         <p>{`${row.category.names.english}`}</p>
      //         <p>{`${row.category.names.arabic}`}</p>
      //       </div>
      //     );
      //   },
      // },

      {
        field: 'subcategory',
        headerName: category,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => {
          return (
            <p
              key={'sub-cat-' + row.id}
            >{`${row.subcategory.names.english}`}</p>
          );
        },
      },
      {
        field: 'size',
        headerName: t('sizes'),
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => {
          return (
            <div key={'sizes-' + row.id}>
              {row.sizes.map((s, i) => {
                return <p key={'s-' + row.id + '-i-' + i}>{s}</p>;
              })}
            </div>
          );
        },
      },
      {
        field: 'color',
        headerName: t('colors'),
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => {
          return (
            <div key={'colors-' + row.id}>
              {row.colors.map((s, i) => {
                return <p key={'c-' + row.id + '-i-' + i}>{s}</p>;
              })}
            </div>
          );
        },
      },
      {
        field: 'prices',
        headerName: t('price'),
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => {
          return (
            <div key={'prices-' + row.id}>
              {row.prices.map((price, i) => {
                return (
                  <div key={'p-' + row.id + '-i-' + i}>
                    {price.discountPrice ? (
                      <p>{`DA ${price.discountPrice}`}</p>
                    ) : (
                      ''
                    )}
                    <p
                      style={{
                        textDecoration: price.discountPrice
                          ? 'line-through'
                          : 'none',
                      }}
                    >{`DA ${price.currentPrice}`}</p>
                  </div>
                );
              })}
            </div>
          );
        },
      },
      {
        field: 'stock',
        headerName: t('stock'),
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => {
          return (
            <div key={'stock-' + row.id}>
              {row.prices.map((s, i) => {
                return <p key={'stock-' + row.id + '-i-' + i}>{s.quantity}</p>;
              })}
            </div>
          );
        },
      },
      {
        field: 'hintText',
        headerName: t('englishDescription'),
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        renderCell: ({ row }) => {
          return (
            <div key={'e-d-' + row.id}>
              <p className="mb-4 hint-text">{`${row.hintText.english}`}</p>
            </div>
          );
        },
      },
      {
        field: 'hintText arabic',
        headerName: t('arabicDescription'),
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        renderCell: ({ row }) => {
          return (
            <div key={'a-d-' + row.id}>
              <p className="hint-text">{`${row.hintText.arabic}`}</p>
            </div>
          );
        },
      },

      {
        field: 'Actions',
        headerName: actions,
        flex: 1,
        minWidth: 100,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          return (
            <div key={'a-' + params.row.id}>
              <div className="flex gap-4 e-d-icons">
                <img
                  src={editIcon}
                  alt="edit icon"
                  className="w-14 h-14"
                  onClick={() => {
                    props.setUpdatedPage(params.row);
                    props.setUpdatedType('text');
                    props.setShowAddAD(true);
                  }}
                />
                <img
                  src={deleteIcon}
                  alt="delete icon"
                  className="w-14 h-14"
                  onClick={() => {
                    props.setOverlay(true);
                    props.setItemId(params.row.id);
                  }}
                />
              </div>
              <div className="flex gap-4 mt-4 e-d-icons">
                <img
                  src={editImgIcon}
                  alt="edit icon"
                  className="w-14 h-14"
                  onClick={() => {
                    props.setUpdatedPage(params.row);
                    props.setUpdatedType('image');

                    props.setShowAddAD(true);
                  }}
                />
                <img
                  src={reviewsIcon}
                  alt="reviews icon"
                  className="w-14 h-14"
                  onClick={() => {
                    props.setUpdatedPage(params.row);
                    props.setShowReviews(true);
                  }}
                />
              </div>
            </div>
          );
        },
      },
    ];
  } else if (props.path === 'orders') {
    height = '100%';
    cols = [
      { field: 'id', hide: true },
      {
        field: 'orderNumber',
        headerName: '#',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
      },
      {
        field: 'userInfo',
        headerName: t('clientInformation'),
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        // renderHeader: params => {
        //   return (
        //     <div
        //       className='t-head-cell'
        //       style={{
        //         width: '100%',
        //         display: 'flex',
        //         flexWrap: 'wrap',
        //       }}>
        //       {t('clientInformation')}
        //     </div>
        //   );
        // },
        renderCell: ({ row }) => {
          return (
            <div>
              <p>{`${row.userInfo.name}`}</p>
              <p>{`${row.userInfo.phone}`}</p>
            </div>
          );
        },
      },
      {
        field: 'address',
        headerName: t('shippingAddress'),
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        // renderHeader: params => {
        //   return (
        //     <div className='t-head-cell'>
        //       <span>Shipping Address</span>
        //       <span>عنوان الشحن</span>
        //     </div>
        //   );
        // },
        renderCell: ({ row }) => {
          return (
            <div>
              <p>{`${row.address.country.english} - ${row.address.government.english} - ${row.address.city.english}`}</p>
              <p>{`${row.address.address}`}</p>
            </div>
          );
        },
      },

      {
        field: 'order',
        headerName: t('productName'),
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        // renderHeader: params => {
        //   return (
        //     <div className='t-head-cell'>
        //       <span>Order</span>
        //       <span>الطلبية</span>
        //     </div>
        //   );
        // },
        renderCell: ({ row }) => {
          return (
            <div className="t-order">
              {row.order.map((p, i) => (
                <p key={i}>{p.productName}</p>
              ))}
            </div>
          );
        },
      },
      {
        field: 'prices',
        headerName: t('piecePrice'),
        flex: 1,

        headerAlign: 'center',
        align: 'center',

        renderCell: ({ row }) => {
          return (
            <div className="t-order">
              {row.prices.map((p, i) => {
                const price = p.discountPrice
                  ? p.discountPrice
                  : p.currentPrice;
                return <p key={i}>{`DA ${price}`}</p>;
              })}
            </div>
          );
        },
      },

      {
        field: 'quantity',
        headerName: t('quantity'),
        flex: 1,

        headerAlign: 'center',
        align: 'center',

        renderCell: ({ row }) => {
          return (
            <div className="t-order">
              {row.quantity.map((q, i) => {
                return <p key={i}>{q}</p>;
              })}
            </div>
          );
        },
      },
      {
        field: 'totalPrice',
        headerName: t('total'),
        flex: 1,

        headerAlign: 'center',
        align: 'center',
        // renderHeader: params => {
        //   return (
        //     <div className='t-head-cell'>
        //       <span>Total Cost</span>
        //       <span>التكلفة الإجمالية</span>
        //     </div>
        //   );
        // },
        renderCell: ({ row }) => {
          return <div className="t-order">{`DA ${row.totalPrice}`}</div>;
        },
      },
      // {
      //   field: 'coupon',
      //   headerName: 'coupon',
      //   width: 80,

      //   headerAlign: 'center',
      //   align: 'center',
      //   // renderHeader: params => {
      //   //   return (
      //   //     <div className='t-head-cell'>
      //   //       <span>Coupon</span>
      //   //       <span>الكوبون</span>
      //   //     </div>
      //   //   );
      //   // },
      //   renderCell: ({ row }) => {
      //     return <div>{row.coupon ? row.coupon : '_'}</div>;
      //   },
      // },
      {
        field: 'orderStatus',
        headerName: t('status'),
        headerAlign: 'center',
        align: 'center',
        // renderHeader: params => {
        //   return (
        //     <div className='t-head-cell'>
        //       <span>Order Status</span>
        //       <span>حالة الطلب</span>
        //     </div>
        //   );
        // },
        renderCell: ({ row }) => {
          let statusMsg;
          if (row.orderStatus === 1) {
            statusMsg = t('pending');
          }
          if (row.orderStatus === 2) {
            statusMsg = t('shipped');
          }
          if (row.orderStatus === 3) {
            statusMsg = t('rejected');
          }
          if (row.orderStatus === 4) {
            statusMsg = t('completed');
          }
          return <div>{statusMsg}</div>;
        },
      },
      // {
      //   field: 'notes',
      //   headerName: 'notes',
      //   flex: 1,

      //   headerAlign: 'center',
      //   align: 'center',
      //   renderHeader: params => {
      //     return (
      //       <div className='t-head-cell'>
      //         <span>Admin Notes</span>
      //         <span>مُلاحظات المُشرف</span>
      //       </div>
      //     );
      //   },
      //   renderCell: ({ row }) => {
      //     return <div>{row.notes ? row.notes : '_'}</div>;
      //   },
      // },

      {
        field: 'Actions',
        headerName: actions,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,

        renderCell: (params) => {
          const id = params.row.id;
          let { orderStatus } = params.row;
          return (
            <div className="flex gap-4 order-actions">
              <img
                src={acceptOrderIcon}
                alt="edit icon"
                className="w-14 h-14"
                style={{
                  opacity: orderStatus === 4 ? 0.3 : 1,
                  cursor: orderStatus === 4 ? 'not-allowed' : 'pointer',
                }}
                onClick={() => {
                  if (orderStatus === 2) {
                    orderStatus = 4;
                  }
                  if (orderStatus === 1) {
                    orderStatus = 2;
                  }
                  if (orderStatus === 3) {
                    orderStatus = 1;
                  }

                  axios
                    .patch(`${APIBase}order/updatestatus`, null, {
                      headers: {
                        authorization: props.token,
                      },
                      params: {
                        id,
                        orderStatus,
                      },
                    })
                    .then((res) => dispatch(props.action))
                    .catch((err) => console.log(err.response.data));
                }}
              />

              <img
                src={rejectOrderIcon}
                className="w-14 h-14"
                alt="delete icon"
                style={{
                  opacity: orderStatus === 3 ? 0.3 : 1,
                  cursor: orderStatus === 3 ? 'not-allowed' : 'pointer',
                }}
                onClick={() => {
                  let newStatus;
                  if (orderStatus === 4) {
                    newStatus = 2;
                  }
                  if (orderStatus === 2) {
                    newStatus = 1;
                  }
                  if (orderStatus === 1) {
                    newStatus = 3;
                  }
                  axios
                    .patch(`${APIBase}order/updatestatus`, null, {
                      headers: {
                        authorization: props.token,
                      },
                      params: {
                        id,
                        orderStatus: newStatus,
                      },
                    })
                    .then((res) => dispatch(props.action))
                    .catch((err) => console.log(err.response.data));
                }}
              />
            </div>
          );
        },
      },
    ];
  } else if (props.path === 'subCategories') {
    cols = [
      { field: 'id', hide: true },
      {
        field: 'position',
        headerName: '#',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
      },
      {
        field: 'imgUrl',
        headerName: photo,
        flex: 1,
        sortable: false,

        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
          return (
            <div className="t-img">
              <img
                src={
                  params.row.imgUrl
                    ? `${APIBase}${params.row.imgUrl}`
                    : subCatImage
                }
                alt={params.row.imgAlt}
              />
            </div>
          );
        },
      },
      {
        field: 'englishName',
        headerName: t('englishName'),

        flex: 1,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'arabicName',
        headerName: t('arabicName'),
        headerAlign: 'center',
        flex: 1,
        align: 'center',
      },

      {
        field: 'color',
        headerName: t('colors'),
        headerAlign: 'center',
        flex: 1,
        align: 'center',
        // width: props.arabicName.width,
        renderCell: ({ row }) => {
          return (
            <div>
              {row.color.map((s, i) => (
                <span key={i}>{s.name} - </span>
              ))}
            </div>
          );
        },
      },
      {
        field: 'size',
        headerName: t('sizes'),

        flex: 1,
        headerAlign: 'center',
        align: 'center',
        // width: props.arabicName.width,
        renderCell: ({ row }) => {
          return (
            <div>
              {row.size.map((s, i) => (
                // <p key={i}>{s.name}</p>
                <span key={i}>{s.name} - </span>
              ))}
            </div>
          );
        },
      },

      {
        field: 'Actions',
        headerName: t('actions'),
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          return (
            <div className="flex gap-4 e-d-icons">
              <img
                src={editIcon}
                alt="edit icon"
                className="w-14 h-14"
                onClick={() => {
                  props.setUpdatedPage(params.row);

                  props.setShowAddAD(true);
                }}
              />
              <img
                src={deleteIcon}
                alt="delete icon"
                className="w-14 h-14"
                onClick={() => {
                  props.setOverlay(true);
                  props.setItemId(params.row.id);
                }}
              />
            </div>
          );
        },
      },
    ];
  } else if (props.path === 'contact') {
    height = '100%';
    cols = [
      { field: 'id', hide: true },
      {
        field: 'number',
        headerName: '#',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
      },
      {
        field: 'name',
        headerName: englishName,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
      },
      {
        field: 'email',
        headerName: email,
        flex: 1,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'subject',
        headerName: subject,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'message',
        headerName: message,
        headerAlign: 'center',
        flex: 1,
        align: 'center',
      },
      // {
      //   field: 'phone',
      //   headerName: 'Phone',
      //   headerAlign: 'center',
      //   flex: 1,
      //   align: 'center',
      // },
      {
        field: 'Actions',
        headerName: actions,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          return (
            <div className="e-d-icons">
              <img
                src={deleteIcon}
                className="w-14 h-14"
                alt="delete icon"
                onClick={() => {
                  props.setItemId(params.row.id);
                  props.setOverlay(true);
                }}
              />
            </div>
          );
        },
      },
    ];
  } else if (props.path === 'countries') {
    cols = [
      { field: 'id', hide: true },
      {
        field: 'number',
        headerName: '#',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
      },
      {
        field: 'englishName',
        headerName: englishName,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
      },
      {
        field: 'arabicName',
        headerName: arabicName,
        flex: 1,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
      },

      {
        field: 'Actions',
        headerName: actions,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          return (
            <div className="flex gap-4 e-d-icons">
              <img
                src={editIcon}
                alt="edit icon"
                className="w-14 h-14"
                onClick={() => {
                  props.setUpdatedPage(params.row);

                  props.setShowAddAD(true);
                }}
              />
              <img
                src={deleteIcon}
                className="w-14 h-14"
                alt="delete icon"
                onClick={() => {
                  props.setOverlay(true);
                  props.setItemId(params.row.id);
                }}
              />
            </div>
          );
        },
      },
    ];
  } else if (props.path === 'governments') {
    cols = [
      { field: 'id', hide: true },
      {
        field: 'number',
        headerName: '#',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
      },
      {
        field: 'country english',
        headerName: countryEnglish,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => {
          return <div>{row.country.names.english}</div>;
        },
      },
      {
        field: 'country arabic',
        headerName: countryArabic,
        headerAlign: 'center',
        flex: 1,
        align: 'center',
        renderCell: ({ row }) => {
          return <div>{row.country.names.arabic}</div>;
        },
      },

      {
        field: 'englishName',
        headerName: englishName,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
      },
      {
        field: 'arabicName',
        headerName: arabicName,
        flex: 1,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
      },

      {
        field: 'Actions',
        headerName: actions,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          return (
            <div className="flex gap-4 e-d-icons">
              <img
                src={editIcon}
                alt="edit icon"
                className="w-14 h-14"
                onClick={() => {
                  props.setUpdatedPage(params.row);

                  props.setShowAddAD(true);
                }}
              />
              <img
                src={deleteIcon}
                alt="delete icon"
                className="w-14 h-14"
                onClick={() => {
                  props.setOverlay(true);
                  props.setItemId(params.row.id);
                }}
              />
            </div>
          );
        },
      },
    ];
  } else if (props.path === 'cities') {
    cols = [
      { field: 'id', hide: true },
      {
        field: 'number',
        headerName: '#',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
      },
      {
        field: 'country english',
        headerName: countryEnglish,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => {
          // return <div>{row.country.names.english}</div>;
          return <div>asdasd</div>;
        },
      },
      {
        field: 'country arabic',
        headerName: countryArabic,
        headerAlign: 'center',
        flex: 1,
        align: 'center',
        renderCell: ({ row }) => {
          // return <div>{row.country.names.arabic}</div>;
          return <div>sdas</div>;
        },
      },
      {
        field: 'government english',
        headerName: governmentEnglish,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: ({ row }) => {
          return <div>{row.government.names.english}</div>;
        },
      },
      {
        field: 'government arabic',
        headerName: governmentArabic,
        headerAlign: 'center',
        flex: 1,
        align: 'center',
        renderCell: ({ row }) => {
          return <div>{row.government.names.arabic}</div>;
        },
      },
      {
        field: 'englishName',
        headerName: englishName,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
      },
      {
        field: 'arabicName',
        headerName: arabicName,
        flex: 1,
        sortable: false,
        headerAlign: 'center',
        align: 'center',
      },

      {
        field: 'Actions',
        headerName: actions,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          return (
            <div className="flex gap-4 e-d-icons">
              <img
                src={editIcon}
                alt="edit icon"
                className="w-14 h-14"
                onClick={() => {
                  props.setUpdatedPage(params.row);

                  props.setShowAddAD(true);
                }}
              />
              <img
                src={deleteIcon}
                alt="delete icon"
                className="w-14 h-14"
                onClick={() => {
                  props.setOverlay(true);
                  props.setItemId(params.row.id);
                }}
              />
            </div>
          );
        },
      },
    ];
  } else {
    cols = [
      { field: 'id', hide: true },
      {
        field: 'position',
        headerName: '#',
        width: 80,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
      },
      {
        field: 'imgUrl',
        headerName: photo,
        width: props.image.width,
        sortable: false,

        headerAlign: 'center',
        align: 'center',
        renderCell: (params) => {
          return (
            <div className="t-img">
              <img
                src={`${APIBase}${params.row.imgUrl}`}
                alt={params.row.imgAlt}
              />
            </div>
          );
        },
      },
      {
        field: 'englishName',
        headerName: props.englishName.title,
        flex: 1,

        headerAlign: 'center',
        align: 'center',
      },
      {
        field: 'arabicName',
        headerName: props.arabicName.title,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
      },

      {
        field: 'englishDesc',
        headerName: props.englishDesc ? props.englishDesc.title : '',
        width: props.englishDesc ? props.englishDesc.width : '',
        headerAlign: 'center',
        align: 'center',
        hide: props.englishDesc ? props.englishDesc.hide : true,
      },
      {
        field: 'arabicDesc',
        headerName: props.arabicDesc ? props.arabicDesc.title : '',
        width: props.arabicDesc ? props.arabicDesc.width : '',
        headerAlign: 'center',
        align: 'center',
        hide: props.arabicDesc ? props.arabicDesc.hide : true,
      },

      {
        field: 'Actions',
        headerName: actions,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        renderCell: (params) => {
          return (
            <div className="e-d-icons">
              <img
                src={editIcon}
                alt="edit icon"
                className="pe-4"
                onClick={() => {
                  props.setUpdatedPage(params.row);

                  props.setShowAddAD(true);
                }}
              />
              <img
                src={deleteIcon}
                alt="delete icon"
                onClick={() => {
                  props.setOverlay(true);
                  props.setItemId(params.row.id);
                }}
              />
            </div>
          );
        },
      },
    ];
  }

  return (
    <Box sx={{ height: height, width: '100%' }}>
      {/* {props.product && (
        <DataGrid
          rows={props.data}
          columns={props.columns}
          pageSize={4}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick={true}
          experimentalFeatures={{ newEditingApi: true }}
        />
      )} */}
      {/* {!props.product && ( */}
      {/* )} */}
      <DataGrid
        rows={props.data}
        columns={cols}
        pageSize={6}
        rowHeight={10}
        rowsPerPageOptions={[6]}
        disableSelectionOnClick={true}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={() => generateRandom()}
      />
    </Box>
  );
};

export default MainTable;
