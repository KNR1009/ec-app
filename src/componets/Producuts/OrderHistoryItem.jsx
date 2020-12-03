import React from 'react'
import Divider from "@material-ui/core/Divider";
// import {OrderedProducts} from "./index";
// import {datetimeToString, dateToString} from "../../function/common";
import {TextDetail} from "../UIkit";

const OrderHistoryItem = (props) => {

  // 注文した日時を取得して変換する関数
  const datetimeTostring = (date) => {
    const year = order.updated_at.toDate().getFullYear()
    const Month = order.updated_at.toDate().getMonth()+1
    const day = order.updated_at.toDate().getDate()
    return year + '年' + Month + '月' + day + '日'
  }
  
  const order = props.order;
  const updated = datetimeTostring(order.updated_at.toDate())
  const shipping = datetimeTostring(order.shipping_date.toDate())
  const total = '¥' + order.amount.toLocaleString()


  return(
    <div>
      <div className="module-spacer--small" />
        <TextDetail label={'注文ID'} value={order.id}></TextDetail>
        <TextDetail label={'注文日時'} value={updated}></TextDetail>
        <TextDetail label={'発送日'} value={shipping}></TextDetail>
        <TextDetail label={'注文合計'} value={total}></TextDetail>
        <div className="module-spacer--extra-extra-small" />
        <Divider />
    </div>
  )
}

export default OrderHistoryItem;