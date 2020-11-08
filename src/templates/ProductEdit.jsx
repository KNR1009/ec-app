import React, { useState, useCallback } from 'react'
import { TextField, PrimaryButton, SelectBox } from "../componets/UIkit/index";
import { saveProduct } from "../reducks/products/operations"
import { useDispatch } from 'react-redux';

const ProductEdit = () => {

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");

  // onchangeに引き渡すコールバック
  const inputName = useCallback((event)=>{
      setName(event.target.value)
  }, [setName])

  const inputDiscription = useCallback((event)=>{
    setDiscription(event.target.value)
  }, [setDiscription])

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


  return (
    <section>
      <div className="c-section-container">
        <h2 className="u-text__headline u-text__center">商品の登録・編集</h2>
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
          value={discription}
          type={"text"}
          onChange={inputDiscription}
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
            dispatch(saveProduct(name, discription, category, gender, price))
          }
        />
      </div>
    </section>
  );
}
export default ProductEdit;