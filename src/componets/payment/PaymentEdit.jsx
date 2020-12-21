import React, { useCallback } from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {PrimaryButton, TextDetail, GreyButton} from "../UIkit/index";
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router'
import { registerCard } from '../../reducks/payments/operations'

import { getUserId, getUsername} from "../../reducks/users/selectors";


const PaymentEdit = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const selector = useSelector(state => state);
  const uid = getUserId(selector)
  const username = getUsername(selector);
  

  // カード情報を登録するメソット
  const register = useCallback(() => {
      dispatch(registerCard(stripe, elements))
  }, [stripe, elements])
  
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
       <PrimaryButton label={"カード情報を登録"} 
       onClick={()=>register()}/>
       <div className="module-spacer--small" />
       <GreyButton label={"マイページに戻る"} 
       onClick={()=>{dispatch(push('/user/mypage'))}}/>
    </div>
    </section>
  )
}

export default PaymentEdit