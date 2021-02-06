import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/styles";
import { getOrderHistory } from '../reducks/users/selectors'
import { fetchOrderHistory } from '../reducks/users/operations'
import {TextDetail} from "../componets/UIkit";
import Divider from "@material-ui/core/Divider";
import { db }  from '../firebase/index'


  const useStyles = makeStyles((theme) => ({
    orderList: {
        background: theme.palette.grey["100"],
        margin: '0 auto',
        padding: 32,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        [theme.breakpoints.up('md')]: {
            width: 768
        }
    },
}))

const Orderlist = () => {
    const classes = useStyles()
    const selector = useSelector((state) => state);
    const orders = getOrderHistory(selector)
    const dispatch = useDispatch()


    // ユーザー情報を格納
    const userdata = []
    // 注文商品とユーザー情報をオブジェクトで格納する配列
    const orderproducs = [];
    // 注文履歴取得のメソット
    useEffect(async()=>{
        const data = await db.collection('users').get()
        data.forEach((user)=>{
            userdata.push(user.id)
        })
        userdata.forEach(async(uid)=>{
          const order = await db.collection('users').doc(uid)
          .collection('orders').doc().get()
          if(order != ""){
            // console.log(uid)
            console.log(uid)
            
          }else{
             console.log('商品は存在しない')
          }
        })

    }, [])



    return(
    <section className="c-section-wrapin">
            <List className={classes.orderList}>
                    <TextDetail label={'注文ID'} value={2121}></TextDetail>
        <TextDetail label={'注文日時'} value={2121}></TextDetail>
        <TextDetail label={'発送日'} value={2121}></TextDetail>
        <TextDetail label={'注文合計'} value={2121}></TextDetail>
        <div className="module-spacer--extra-extra-small" />
        <Divider />
            </List>
    </section>
    )
}

export default Orderlist
