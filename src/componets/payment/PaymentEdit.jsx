import React from 'react'
import {CardElement} from '@stripe/react-stripe-js';
import {PrimaryButton, TextDetail, GreyButton} from "../UIkit/index";
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router'

const PaymentEdit = () => {
  const dispatch = useDispatch();
  
  return(
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">
        クレジットカード情報の登録・編集
      </h2>
      <div className="module-spacer--medium"></div>
      <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
    />
    <div className="module-spacer--medium"></div>
    <div className="u-text-center">
       <PrimaryButton label={"マイページに戻る"} 
       onClick={()=>{dispatch(push('/user/mypage'))}}/>
    </div>
    </section>
  )
}

export default PaymentEdit