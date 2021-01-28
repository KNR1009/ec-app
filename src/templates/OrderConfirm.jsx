import React, {useCallback, useMemo, useState, useEffect} from 'react';
import { db } from '../firebase';
import {useDispatch, useSelector} from "react-redux";
import List from "@material-ui/core/List";
import {getProductsInCart} from "../reducks/users/selectors";
import { CartListItem } from '../componets/Producuts/index'
import { PrimaryButton, GreyButton } from '../componets/UIkit/index'
import {push} from 'connected-react-router'
import {makeStyles} from "@material-ui/core/styles";
import { TextDetail } from '../componets/UIkit/index'
import Divider from '@material-ui/core/Divider';
import { orderProduct } from '../reducks/products/operations'



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
  const dispatch = useDispatch()

  // storeのstateの商品情報の取得
  const selector = useSelector((state)=> state);
  const productsInCart = getProductsInCart(selector);

  // 合計金額の計算
  const subtotal = useMemo(() => {
      return productsInCart.reduce((sum, product) => sum += product.price, 0)
  }, [productsInCart])

  // 送料の設定(1万円以上は無料)
  const [shippingFee ,setShippingFee] = useState("")
  // const shippingFee = (subtotal >= 10000) ? 0 : 210;
  const shipmentId = "6ugyx5UkDGSdrtzHJzTT";

  useEffect(()=>{
    (async () => {
      await db.collection("shipping").doc(shipmentId).get().then((doc)=>{
          const data = doc.data()
          setShippingFee(data.shipping_fee)
      })
    })()
},[])

  // 税金
  const tax = (subtotal) * 0.1
  const total = subtotal + tax + Number(shippingFee)


  // 注文ボタンがクリックされた際に呼び出される
  const order = useCallback(()=>{
    dispatch(orderProduct(productsInCart, total))
  }, [productsInCart, total])

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
          <TextDetail label={'商品合計'} value={'¥' + subtotal.toLocaleString() + '円'}/>
          <TextDetail label={'消費税' + '円'} value={'¥' + tax+ '円'}/>
          <TextDetail label={'送料'} value={'¥' + shippingFee + '円'}/>
          < Divider />
          <TextDetail label={'合計(税込み)'} value={'¥' + total.toLocaleString()+ '円'}/>
          <PrimaryButton label={"注文を確定"}   onClick={()=>order()}/>
        </div>
      </div>
    </section>
  )
}

export default OrderConfirm;