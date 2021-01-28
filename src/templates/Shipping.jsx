import React, { useState, useCallback, useEffect } from 'react'
import { TextInput, PrimaryButton } from "../componets/UIkit/index";
import { useDispatch } from 'react-redux';
import { db } from '../firebase';
import { push } from "connected-react-router";

const Shipping = () => {
  const [shippingFee ,setShippingFee] = useState("")
  const shipmentId = "6ugyx5UkDGSdrtzHJzTT";
  const dispatch = useDispatch()

  //   現在の配送料の取得
  useEffect(()=>{
      (async () => {
        await db.collection("shipping").doc(shipmentId).get().then((doc)=>{
            const data = doc.data()
            setShippingFee(data.shipping_fee)
        })
      })()
  },[])

  // 配送料の更新
  const chageShipping = useCallback(async()=>{
      const updatefee = {
          shipping_fee:shippingFee
      }
      await db.collection("shipping").doc(shipmentId).update(updatefee)
      .then(()=>{
          alert('配送料を更新しました')
          dispatch(push('/'))
      }).catch((error)=>{
        alert(error)
        return;
      })    
  })


  // firebaseから送料を取得
  return (
   <section>
            <h2 className="u-text__headline u-text-center">配送料の設定</h2>
            <div className="c-section-container">
                <TextInput
                    fullWidth={true} label={"配送料"} multiline={false} required={true}
                    onChange={(e)=>{setShippingFee(e.target.value)}} rows={1} value={shippingFee} type={"text"}
                />

                <div className="module-spacer--small"/>
                <div className="center">
                    <PrimaryButton
                        label={"配送料を保存"}
                        onClick={()=>chageShipping()}
                    />
                </div>
            </div>
        </section>
  )
}

export default Shipping
