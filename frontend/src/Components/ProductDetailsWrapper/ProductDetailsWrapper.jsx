import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../ProductDetails/ProductDetails';

function ProductDetailsWrapper() {
  const { id } = useParams();

  return <ProductDetails id={id} />;
}

export default ProductDetailsWrapper;
