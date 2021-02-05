import React, { useState, useCallback, useEffect } from 'react'
import { TextInput, PrimaryButton, SelectBox } from "../componets/UIkit/index";
import { saveProduct } from "../reducks/products/operations"
import { useDispatch } from 'react-redux';
import { ImageArea } from '../componets/Producuts/index'
import { db } from '../firebase';
import {SetSizesArea } from '../componets/Producuts/'

// フラッシュバーの作成
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

  const ProductEdit = () => {

  const dispatch = useDispatch();
  // 商品の編集
  let id = window.location.pathname.split('/product/edit')[1];
  if(id !== ""){
    id = id.split('/')[1]
  }

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([])
  const [sizes, setSizes] = useState([])

  // onchangeに引き渡すコールバック
  const inputName = useCallback((event)=>{
      setName(event.target.value)
  }, [setName])

  const inputDescription = useCallback((event)=>{
    setDescription(event.target.value)
  }, [setDescription])

  const inputPrice = useCallback((event)=>{
    setPrice(event.target.value)
  }, [setPrice])


  // カテゴリー用の連想配列
  // const categories = [
  //   {id: 'tops', name: "トップス"},
  //   {id: "shirts", name:'シャツ'},
  //   {id: 'pants', name: 'パンツ'}
  // ]

  // 性別の連想配列
  const genders = [
    { id: "all", name: "すべて" },
    { id: "male", name: "メンズ" },
    { id: "female", name: "レディース" },
  ];

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

    // idが一致する商品情報をrenderした際に取得
  useEffect(()=>{
    if(id !==  ""){
      db.collection('products').doc(id).get().then(snapshot => {
        const product = snapshot.data()
        setName(product.name)
        setDescription(product.description)
        setImages(product.images)
        setCategory(product.category)
        setGender(product.gender)
        setPrice(product.price)
        setSizes(product.sizes)
      })
    }
  }, [])

  // カテゴリー一覧をfirebaseより取得
  useEffect(()=>{
    db.collection('categories')
    .orderBy('order', 'asc')
    .get()
    .then((snapshots)=>{
      const list = [];
      snapshots.forEach(snapshot => {
        const data = snapshot.data();
        list.push({
          id: data.id,
          name: data.name
        })
      })
      setCategories(list)
    })
  },[])


  return (
    <section>
            <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
            <div className="c-section-container">
                <ImageArea images={images} setImages={setImages} />
                <TextInput
                    fullWidth={true} label={"商品名"} multiline={false} required={true}
                    onChange={inputName} rows={1} value={name} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"商品説明"} multiline={true} required={true}
                    onChange={inputDescription} rows={5} value={description} type={"text"}
                />
                <SelectBox
                    label={"カテゴリー"} options={categories} required={true} select={setCategory} value={category}
                />
                <SelectBox
                    label={"性別"} options={genders} required={true} select={setGender} value={gender}
                />
                <TextInput
                    fullWidth={true} label={"価格"} multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={"number"}
                />

                <div className="module-spacer--small"/>
                <SetSizesArea sizes={sizes} setSizes={setSizes} />
                <div className="module-spacer--small" />
                <div className="center">
                    <PrimaryButton
                        label={"商品情報を保存"}
                        onClick={() => {
                          dispatch(saveProduct(id, name, description, category, gender, price, images, sizes ))
                          handleClick()
                        }}
                    />
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                商品を追加しました
              </Alert>
            </Snackbar>
        </section>
  );
}
export default ProductEdit;