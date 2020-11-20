import React, {useCallback, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import logo from '../../assets/img/src/icons/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { getIsSignedIn } from '../../reducks/users/selectors';
import {push} from 'connected-react-router'
import {HeaderMenu ,CloseableDrawer} from './index'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuBar: {
      backgroundColor: "#fff",
      color: '#444',
  },
  toolBar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%'
  },
  iconButtons: {
      margin: '0 0 0 auto'
  },
  pointer: {
    cursor: 'pointer'
  }
}));



const Header = () => {
  const classes = useStyles()
  const selector = useSelector((state) => state)
  const isSignedIn = getIsSignedIn(selector)
  const dispatch = useDispatch();

  // 開閉メニューのpropsを作成

 const [sideBarOpen, setSideBarOpen] = useState(false);

    const handleDrawerToggle = useCallback((event, isOpen) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setSideBarOpen(isOpen)
    }, [setSideBarOpen]);


  return(
     <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolBar}>
                    <img alt="Logo" src={logo} width="128px" role="button" className={classes.pointer} onClick={() => dispatch(push('/'))}/>
                    {isSignedIn && (
                        <div className={classes.iconButtons}>
                            <HeaderMenu handleDrawerToggle ={handleDrawerToggle}/>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <CloseableDrawer 
              open={sideBarOpen}
              onClose={handleDrawerToggle}
            />
           
        </div>
  )
}

export default Header