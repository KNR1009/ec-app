import React, {useEffect} from 'react'
import Divider from "@material-ui/core/Divider";
// import {OrderedProducts} from "./index";
// import {datetimeToString, dateToString} from "../../function/common";
import {TextDetail} from "../UIkit";
import {OrderProducts} from '../Producuts/index'

const OrderHistoryItem = (props) => {

  // 注文した日時を取得して変換する関数
const datetimeTostring = (dt) => {
    return dt.getFullYear() + '年'
        + ((dt.getMonth()+1)) + '月'
        + (dt.getDate()) + '日'
        
};
  
  const order = props.order;
  const updated = datetimeTostring(order.updated_at.toDate())
  const shipping = datetimeTostring(order.shipping_date.toDate())
  const total = '¥' + order.amount.toLocaleString()
  const products = props.order.products




  return(
    <div>
      <div className="module-spacer--small" />
        <TextDetail label={'注文ID'} value={order.id}></TextDetail>
        <TextDetail label={'注文日時'} value={updated}></TextDetail>
        <TextDetail label={'発送日'} value={shipping}></TextDetail>
        <TextDetail label={'注文合計'} value={total}></TextDetail>
         {Object.keys(products).length > 0 && (
            <OrderProducts products={products} />
            )}
        <div className="module-spacer--extra-extra-small" />
        <Divider />
    </div>
  )
}

export default OrderHistoryItem;