import React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {makeStyles} from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import {useSelector} from "react-redux";
import {getUserId} from "../../reducks/users/selectors";
import {db} from "../../firebase/index"

const useStyles = makeStyles((theme)=>({
    list:{
      height: 128,
    },
    image: {
      objectFit: 'cover',
      margin: 16,
      height: 96,
      width: 96
    },
    text:{
      width: '100%'
    }
}))

const CartListItem  = (props) => {
  const classes = useStyles()
  const selector = useSelector((state) => state)

  // 金額に対してカンマを付与する
  const price = props.product.price.toLocaleString();

  // 削除ボタンを押した時の変更処理を記述
  const removeProductFromCart = (id) => {
      const uid = getUserId(selector)
      return db.collection('users').doc(uid).collection('cart').doc(id).delete();
  }

  return(
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img src={props.product.images[0].path} alt="" className={classes.image}/>
        </ListItemAvatar>
        <div className={classes.text}>
           <ListItemText primary={props.product.name} secondary={'サイズ : '+ props.product.size}/>
           <ListItemText primary={'¥' + price} />
        </div>
        <IconButton onClick={()=>{ removeProductFromCart(props.product.cartId)}}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
       <Divider />
    </>
  )
}

export default CartListItem 