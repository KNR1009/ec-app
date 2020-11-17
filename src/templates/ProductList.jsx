import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {ProductCard} from '../componets/Producuts'
import {fetchProducts} from '../reducks/products/operations'
import { ProductsReducer } from '../reducks/products/reducers';
import {getProducts} from '../reducks/products/selectors'


const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector)

  useEffect(()=>{
      dispatch(fetchProducts());
  }, [])


  return(
    <div className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 && (
          products.map(product => (
            <ProductCard key={product.id} id={product.id} name={product.name} images={product.images} price={product.price}/>
          )
        ))
        }
      </div>
    </div>
  )
}

export default ProductList