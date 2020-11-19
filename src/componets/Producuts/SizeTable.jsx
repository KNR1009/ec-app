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

const useStyles = makeStyles({
  iconCell: {
    height: 48,
    width: 48,
  },
  
})



const SizeTable = (props) => {
  const sizes = props.sizes;
  const classes = useStyles();

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
                    <ShoppingCartIcon  />
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
  </TableContainer  >
  )
}

export default SizeTable;