import React, { useCallback, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {TextInput} from "../UIkit";

const useStyles = makeStyles((theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: 256,
                flexShrink: 0,
            }
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: 256,
        },
       searchField: {
            alignItems: 'center',
            display: 'flex',
            marginLeft: 32
        }
    }),
);

const CloseableDrawer = (props) => {
    const classes = useStyles();
    const {container} = props;
    const [searchKeyword, setKeyword] = useState("")

    // テキスト入力のonchangeメソット
    const inputSearchKeyword = useCallback((e)=>{
        setKeyword(e.target.value);
    }, [setKeyword])


    return(
      <nav className="classes drawer">
         <Drawer
                container={container}
                variant="temporary"
                anchor={"right"}
                open={props.open}
                onClose={(e) => props.onClose(e, false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
        <div>
          <div className={classes.searchField}>
              <TextInput
                  fullWidth={false} label={"キーワードを入力"} multiline={false}
                  onChange={inputSearchKeyword} required={false} rows={1} value={searchKeyword} type={"text"}
              />
              <IconButton>
                  <SearchIcon />
              </IconButton>
          </div>
              <Divider />
              <List>
                <ListItem button key="logout">
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary={"ログアウト"}/>
                </ListItem>
              </List>
          
        </div>
       </Drawer>
      </nav>
    )
}

export default CloseableDrawer