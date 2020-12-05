import React, {useCallback, useEffect} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/styles";
import {PrimaryButton} from "../UIkit";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router"

const useStyles = makeStyles((theme) =>({
  image: {
        objectFit: 'cover',
        margin: '8px 16px 8px 0',
        height: 96,
        width: 96
    },
  list:{
      backgroundColor: '#fff',
      height: 'auto'
  },
  text:{
      width: '100%',
  }
}))

const OrderProducts = (props) => {
  const products = props.products;
  const classes = useStyles()
  const dispatch = useDispatch()
  
  // 商品詳細ページに遷移させるメソットの作成
  const gtToProductPage = useCallback((id)=>{
        dispatch(push('/product/' + id))
  },[])

 
   return (
        <List>
            {Object.keys(products).map(key => {
                const product = products[key]


                return (
                    <>
                        <ListItem className={classes.list} key={product.id}>
                            <ListItemAvatar>
                                <img className={classes.image} src={product.images[0].path} alt="商品のTOP画像" />
                            </ListItemAvatar>
                            <div className={classes.text}>
                                <ListItemText primary={product.name} secondary={"サイズ：" + product.size} />
                                <ListItemText primary={"¥"+product.price.toLocaleString()} />
                            </div>
                           <div>
                              <PrimaryButton label={"商品詳細を見る"} onClick={()=>{gtToProductPage(product.id)}}  
                              className={classes.btn}
                              />
                           </div>
                        </ListItem>
                        <Divider />
                    </>
                )
            })}
        </List>
    );
}

export default OrderProducts