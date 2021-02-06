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
import {TextInput, ModalIN} from "../UIkit";
import { useDispatch, useSelector } from 'react-redux';
import {push} from 'connected-react-router'
import {signOut} from '../../reducks/users/operations'
import { db } from '../../firebase';
import { getRole, getEmail } from "../../reducks/users/selectors"
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';

// モーダル
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { PrimaryButton } from '../UIkit'
import CancelIcon from '@material-ui/icons/Cancel';




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
        },
           modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: "#EEEEEE",
            outline: 'none',
            borderRadius: '10px',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 3, 10),
        },
        elright: {
            textAlign: "right",
            cursor: "pointer"
        },
        filed: {
            display:'block'
        },
        textcenter: {
            textAlign:'center'
        }
    }),
);

const CloseableDrawer = (props) => {
    const classes = useStyles();
    const {container} = props;
    const [searchKeyword, setKeyword] = useState("")
    const dispatch = useDispatch()
    // モーダルの開閉管理
    const [isOpen, setIsopen] = useState(false)
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    
    const handleOpen = () => {
        setIsopen(true);
    };

    const handleClose = () => {
        setIsopen(false);
    };

    // お問い合わせ内容をfirebaseへ保存
    const contactSave = useCallback((email, contact)=>{
       db.collection('contact').doc().set({
           email: email,
           contact: contact
       })
       .then(()=>{
           alert('お問い合わせ内容を送信しました')
           dispatch(push('/'))
       }).catch((error)=>{
           throw new Error(error)
       })
    })



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

    // モダールの開閉
    const openModal = useCallback(()=>{
        setIsopen(true)
    })

return(
<>
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
            <ListItem button key="orderlist" onClick={(e)=>{selectMenu(e, "/order/list")}}>
                <ListItemIcon>
                    <LocalMallOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary={"注文商品一覧"}/>
            </ListItem>

        </>)}
        {/* 管理ユーザーのみ */}
        <ListItem button key="contact" onClick={()=>{handleOpen()}}>
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
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <>
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <div className={classes.elright}><CancelIcon fontSize="large"
            onClick={()=>handleClose()}
            /></div>
            <TextInput
            fullWidth={true}
            label={"メールアドレス"}
            multiline={false}
            required={true}
            rows={1}
            value={email}
            type={"text"}
            onChange={(e)=>{setEmail(e.target.value)}}
            />
            <TextInput
            fullWidth={true}
            label={"お問い合わせ内容"}
            multiline={true}
            required={true}
            rows={4}
            value={contact}
            type={"text"}
            onChange={(e)=>{setContact(e.target.value)}}
            />
            <div className="module-spacer--medium"></div>
            <div className={classes.textcenter}>
              <PrimaryButton label={"送信"} onClick={()=>{contactSave(email, contact)}}/>
            </div>
          </div>
        </Fade>
        </>
    </Modal>
</>
)
}

export default CloseableDrawer