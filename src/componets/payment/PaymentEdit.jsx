import React, { useCallback, useEffect, useState } from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {PrimaryButton, TextDetail, GreyButton} from "../UIkit/index";
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router'
import { registerCard, retrievePaymentMethod } from '../../reducks/payments/operations'

import { getCustomerId, getPaymentMethodId, getUserId} from "../../reducks/users/selectors";


const PaymentEdit = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const selector = useSelector(state => state);
  const customerId = getCustomerId(selector);
  const paymentMethodId= getPaymentMethodId(selector);

  const [card, setCard] = useState({})


  // カード情報を登録するメソット
  const register = useCallback(() => {
      dispatch(registerCard(stripe, elements))
  }, [stripe, elements])


   useEffect(() => {
        (async() => {
            const cardData = await retrievePaymentMethod(paymentMethodId)
            if (cardData) {
                console.log(cardData);
                setCard(cardData)
            }
        })()
    },[paymentMethodId]);
  
  return(
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">
        クレジットカード情報の登録・編集
      </h2>
      <div className="module-spacer--medium"></div>
      <h3>現在登録されているカード情報</h3>
      <div className="module-spacer--medium"></div>
      <TextDetail />
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