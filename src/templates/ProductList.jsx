import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {ProductCard} from '../componets/Producuts'

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(fetchProducts);
  }, [])

  return(
    <div className="c-section-wrapin">
      <div className="p-grid__row"></div>
    </div>
  )
}

export default ProductList