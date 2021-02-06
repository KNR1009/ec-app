import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import List from "@material-ui/core/List";
import {getProductsInCart} from "../reducks/users/selectors";
import { CartListItem } from '../componets/Producuts/index'
import { PrimaryButton, GreyButton } from '../componets/UIkit/index'
import {push} from 'connected-react-router'
import {makeStyles} from "@material-ui/core/styles";



const usestyles = makeStyles(()=>({
    root:{
      margin: '0 auto',
      maxWidth: 512,
      width: '100%'

    }
}))

const CartList = () => {
  const selector = useSelector((state) => state);
  const productsInCart= getProductsInCart(selector)
  const dispatch = useDispatch()
  const classes = usestyles()

  const goToOrder = useCallback(()=>{
      // カート内に商品が入っていない時はエラーを出す
      if(productsInCart.length < 1){
        alert('カートが空です')
        return false
      }else{
        dispatch(push('/order/confirm'))
      }
  }, [])

  const backToTop = useCallback(()=>{
      dispatch(push('/'))
  })


  return(
    <section className="c-section-wrapin">
      <h2 className="u-text__headLine">ショッピングカート
      </h2>
      <List className={classes.root}>
          {productsInCart.length > 0 && (
              productsInCart.map(product => <CartListItem product={product} key={product.cartId} />)
          )}
      </List>
      <div className="module-spacer--medium" />
            <div className="p-grid__column">
                <PrimaryButton label={"レジへ進む"}   onClick={()=>goToOrder()}/>
                <div className="module-spacer--extra-extra-small"/>
                <GreyButton label={"ショッピングを続ける"}  onClick={()=>backToTop()}/>
      </div>
    </section>
  );
}

export default CartList