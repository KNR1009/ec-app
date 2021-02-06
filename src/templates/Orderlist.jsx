import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/styles";
import { getOrderHistory } from '../reducks/users/selectors'
import { fetchOrderHistory } from '../reducks/users/operations'
import { OrderHistoryItem } from '../componets/Producuts'


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
  

    // 注文履歴取得のメソット
    useEffect(()=>{
        dispatch(fetchOrderHistory())
    }, [])

    return(
    <section className="c-section-wrapin">
            <List className={classes.orderList}>
                {orders.length > 0 && (
                    orders.map(order => <OrderHistoryItem order={order} key={order.id} />)
                )}
            </List>
    </section>
    )
}

export default Orderlist
