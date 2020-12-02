import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/styles";
import { getOrderHistory } from '../reducks/users/selectors'
import { fetchOrderHistory } from '../reducks/users/operations'

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

const OrderHistory = () => {
    const classes = useStyles()
    const selector = useSelector((state) => state);
    const getOrder = getOrderHistory(selector)
    const dispatch = useDispatch()

    // 注文履歴取得のメソット
    useEffect(()=>{
        dispatch(fetchOrderHistory())
    }, [])

    console.log(getOrder)

    return(
      <>
        <section className="c-section-wrapin">
          <List className={classes.orderList}>
          </List>
        </section>
      </>
    )
}

export default OrderHistory;