import React, { useState, useCallback } from 'react'
import { TextField, PrimaryButton } from "../componets/UIkit/index";

const ProductEdit = () => {

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
    </section>
  );
}
export default ProductEdit;