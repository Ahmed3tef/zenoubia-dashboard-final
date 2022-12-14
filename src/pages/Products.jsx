import React from 'react';
import { useSelector } from 'react-redux';
import { MainPageLayout } from '../components';

import addIcon from '../assets/Add Product.svg';

import { loadProducts } from '../store/reducers/products';

const Products = () => {
  const products = useSelector(state => state.products.products);
  return (
    <MainPageLayout
      path='products'
      data={products}
      route='product'
      deleteTitle='product'
      action={loadProducts()}
      title='Active Products'
      addIcon={addIcon}
      // image={{ title: 'Photo', width: 100 }}
      // name={{ title: 'Title', width: 110 }}
      // category={{ title: 'Category', width: 75 }}
      // subcategory={{ title: 'Subcategory', width: 100 }}
      // size={{ title: 'Weight or Size', width: 65 }}
      // price={{ title: 'Price', width: 60 }}
      // desc={{ title: 'Hint Description', width: 215 }}
    />
  );
};

export default Products;
