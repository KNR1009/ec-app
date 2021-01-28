import React, { useCallback, useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {push} from 'connected-react-router'
import {signOut} from '../../reducks/users/operations'
import { db } from '../../firebase';
import { getRole } from "../../reducks/users/selectors"
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ContactMailIcon from '@material-ui/icons/ContactMail';

const useStyles = makeStyles((theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: 256, // drawerのアイコン
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
    const dispatch = useDispatch()

    // モダールの開閉
    const [isopenModal, setIsopenModal] = useState(false)

    // 管理ユーザーかの判定
    const selector = useSelector((state)=>state)
    const userRole = getRole(selector)

    // テキスト入力のonchangeメソット
    const inputSearchKeyword = useCallback((e)=>{
        setKeyword(e.target.value);
    }, [setKeyword])


    // 配列に格納するメソットを作成する
    const selectMenu = (event, path) => {
         dispatch(push(path));
         props.onClose(event)
    }

    // ここにカテゴリー分類を作成する
    const [filters, setFilters] = useState([
        {func: selectMenu, label: "すべて",    id: "all",    value: "/"              },
        {func: selectMenu, label: "メンズ",    id: "male",   value: "/?gender=male"  },
        {func: selectMenu, label: "レディース", id: "female", value: "/?gender=female"},
    ])

    const menus = [
    {func: selectMenu, label: "注文履歴",    icon: <HistoryIcon/>,   id: "history",  value: "/order/history"},
    {func: selectMenu, label: "プロフィール", icon: <PersonIcon/>,    id: "profile",  value: "/user/mypage"},
    ];

    // firebaseからカテゴリーを取得する
    useEffect(()=>{
            db.collection("categories")
            .orderBy('order', 'asc')
            .get()
            .then((snapshots)=>{
                const list = [];
                snapshots.forEach((snapshot)=>{
                    const data = snapshot.data();
                    list.push({
                        func: selectMenu, label: data.name,  id: data.id,  value: `/?category=${data.id}`
                    })
                })
                // 取得したカテゴリーを入れる
                setFilters(prevState => [...prevState, ...list])
            })  
    },[])

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
        {menus.map(menu=>(
            <ListItem button key={menu.id} onClick={(e)=>{menu.func(e, menu.value)}}
            >
                <ListItemIcon>
                    {menu.icon}
                </ListItemIcon>
                    <ListItemText primary={menu.label}/>
            </ListItem>
        ))}
        {/* 管理ユーザーのみ */}
        {userRole === "administrator" && (
        <>
            <ListItem button key="register" onClick={(e)=>{selectMenu(e, "/product/edit")}}>
                <ListItemIcon>
                <AddCircleIcon/>
                </ListItemIcon>
                <ListItemText primary={"商品の登録"}/>
            </ListItem>
            <ListItem button key="shipping" onClick={(e)=>{selectMenu(e, "/product/shipping")}}>
                <ListItemIcon>
                    <LocalShippingIcon/>
                </ListItemIcon>
                <ListItemText primary={"配送料の設定"}/>
            </ListItem>
        </>)}
        {/* 管理ユーザーのみ */}
        <ListItem button key="register" onClick={(e)=>{selectMenu(e, "/product/edit")}}>
          <ListItemIcon>
               <ContactMailIcon/>
               </ListItemIcon>
           <ListItemText primary={"お問い合わせ"}/>
        </ListItem>
        <ListItem button key="logout" onClick={()=>dispatch(signOut())}>
            <ListItemIcon>
            <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"ログアウト"}/>
        </ListItem>
        </List>
        <Divider />
        <List>
            {filters.map(filter => (
                <ListItem button key={filter.id} onClick={(e)=>{filter.func(e, filter.value)}}>
                  <ListItemText primary={filter.label}/>
                </ListItem>
            ))}
        </List>
    
</div>
</Drawer>
</nav>
)
}

export default CloseableDrawer