import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import List from "@material-ui/core/List";
import {getProductsInCart} from "../reducks/users/selectors";
import { CartListItem } from '../componets/Producuts/index'
import { PrimaryButton, GreyButton } from '../componets/UIkit/index'
import {push} from 'connected-react-router'
import {makeStyles} from "@material-ui/core/styles";
import { TextDetail } from '../componets/UIkit/index'
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  detailBox: {
    margin: '0 atuo',
    [theme.breakpoints.down('sm')]:{
      width: 320
    },
    [theme.breakpoints.up('md')]:{
      width: 512
    }
  },
  orderBox:{
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: '4px',
    boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
    height: 256,
    margin: '24px auto 16px auto',
    padding: 16,
    width: 288


  }
}))

const OrderConfirm = () => {

  // スタイルの定義
  const classes = useStyles()

  // storeのstateの商品情報の取得
  const selector = useSelector((state)=> state);
  const productsInCart = getProductsInCart(selector);

  // 合計金額の計算
  const subtotal = useMemo(() => {
      return productsInCart.reduce((sum, product) => sum += product.price, 0)
  }, [productsInCart])

  // 送料の設定
  const shippingFee = (subtotal >= 10000) ? 0 : 210;

  // 税金
  const tax = (subtotal + shippingFee ) * 0.1
  const total = subtotal + shippingFee + tax

  return(
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List> 
            {productsInCart.length > 0 && (
                productsInCart.map(product => 
                  <CartListItem product={product} key={product.cartId}/>
                  )
            )
            }
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail label={'商品合計'} value={subtotal}/>
          <TextDetail label={'送料'} value={shippingFee}/>
          <TextDetail label={'消費税'} value={tax}/>
          < Divider />
          <TextDetail label={'合計(税込み)'} value={'¥' + total}/>
        </div>
      </div>
    </section>
  )
}

export default OrderConfirm;