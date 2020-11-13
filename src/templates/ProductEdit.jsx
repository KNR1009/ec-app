import React, { useState, useCallback, useEffect } from 'react'
import { TextField, PrimaryButton, SelectBox } from "../componets/UIkit/index";
import { saveProduct } from "../reducks/products/operations"
import { useDispatch } from 'react-redux';
import { ImageArea } from '../componets/Producuts/index'
import { db } from '../firebase';


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
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([])

  // onchangeに引き渡すコールバック
  const inputName = useCallback((event)=>{
      setName(event.target.value)
  }, [setName])

  const inputdescription = useCallback((event)=>{
    setDescription(event.target.value)
  }, [setDescription])

  const inputPrice = useCallback((event)=>{
    setPrice(event.target.value)
  }, [setPrice])


  // カテゴリー用の連想配列
  const categories = [
    {id: 'tops', name: "トップス"},
    {id: "shirts", name:'シャツ'},
    {id: 'pants', name: 'パンツ'}
  ]

  // 性別の連想配列
  const genders = [
    { id: "all", name: "すべて" },
    { id: "male", name: "メンズ" },
    { id: "female", name: "レディース" },
  ];

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

      })
    }
  }, [])


  return (
    <section>
      <div className="c-section-container">
        <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
        <ImageArea images={images} setImages={setImages}/>
        <TextField
          fullWidth={true}
          label={"商品名"}
          multiline={false}
          required={true}
          rows={1}
          value={name}
          type={"text"}
          onChange={inputName}
        />
        <TextField
          fullWidth={true}
          label={"商品説明"}
          multiline={true}
          required={true}
          rows={5}
          value={description}
          type={"text"}
          onChange={inputdescription}
        />

        <SelectBox
          label={"カテゴリー"}
          options={categories}
          required={true}
          select={setCategory}
          value={category}
        />
        <SelectBox
          label={"性別"}
          options={genders}
          required={true}
          select={setGender}
          value={gender}
        />
        <TextField
          fullWidth={true}
          label={"価格"}
          multiline={false}
          required={true}
          rows={1}
          value={price}
          type={"number"}
          onChange={inputPrice}
        />
      </div>

      <div className="module-spacer--medium"></div>
      <div className="center">
        <PrimaryButton
          label={"商品を追加"}
          onClick={() =>
            dispatch(saveProduct(id,name, description, category, gender, price, images))
          }
        />
      </div>
    </section>
  );
}
export default ProductEdit;