import React from 'react';
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {makeStyles} from "@material-ui/styles";

// フラッシュバーの作成
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
   iconCell: {
    height: 48,
    width: 48,
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
})
)

// フラッシュバー
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SizeTable = (props) => {
  const sizes = props.sizes;
  const classes = useStyles();

      // フラッシュバー
    const [open, setOpen] = React.useState(false);
        const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };
    // フラッシュバー終了

  return(
    <TableContainer>
     <Table>
      <TableBody>
        {sizes.length > 0 && (
          sizes.map(size => (
            <TableRow key={size.size}>
              <TableCell>{size.size}</TableCell>
              <TableCell>残り{size.quantity}点</TableCell>
              <TableCell className={classes.icon}>
                  {size.quantity > 0 ? (
                  <IconButton>
                    <ShoppingCartIcon onClick={()=>
                      {props.addProduct(size.size)
                      handleClick()}
                      }
                      />
                  </IconButton>
                  ): (
                      <div>売り切れ</div>
                  )}
              </TableCell>
              <TableCell className={classes.icon}>
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
     </Table>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          商品がカートに追加されました
        </Alert>
      </Snackbar>
  </TableContainer  >
  
  )
}

export default SizeTable;