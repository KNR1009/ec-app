import {CardElement} from '@stripe/react-stripe-js';
import { db, FirebaseTimestamp } from "../../firebase/index";
import { push } from "connected-react-router";
import { useDispatch } from 'react-redux';
import { updateUserStateAction } from '../users/actions'


// Set Header
const headers = new Headers();
headers.set('Content-type', 'application/json');
const BASE_URL = "https://ec-app-8ba0b.web.app"





// 新規登録を叩く
const createCustomer = async (email, paymentMethodId, uid) => {
    const response = await fetch(BASE_URL + '/v1/customer', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            email: email,
            paymentMethod: paymentMethodId,
            userId: uid
        })
    });

    const customerResponse = await response.json();
    // firebaseに保存するために返り値を保存する
    return JSON.parse(customerResponse.body);
}

// ユーザーのカード情報を取得するAPIを叩くメソット
export const retrievePaymentMethod = async (paymentMethodId) => {
    const response = await fetch(BASE_URL + '/v1/paymentMethod', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            paymentMethodId: paymentMethodId
        })
    });

    const paymentMethodResponse = await response.json();
    const paymentMethod = JSON.parse(paymentMethodResponse.body);
    return paymentMethod.card;
}



export const registerCard = (stripe, elements, customerId) => {
  return async (dispatch, getState)=> {
    // ログインユーザーの情報を取得する
    const user = getState().users;
    const email = user.email;
    const uid = user.uid;

    // 以下はバリデーションの定型分(コピペ)
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      console.error("Does not exist stripe or elements");
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.

    // 以下でカード情報を取得する
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
     const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

    if (error) {
      alert('error')
      return;
    } 

    // paymentメソットをトークン化したidを以下で取得する
    const paymentMethodId = paymentMethod?.id;
    
    if(customerId === ""){
     
    const customerData = await createCustomer(email, paymentMethodId, uid);
     // 処理がうまくいっているのかの確認を行う
      if(customerData.id === ""){
        alert('カード情報の登録に失敗しました')
        return;
      }else{
        const updateUserState = {
            customer_id: customerData.id,
            payment_method_id: paymentMethodId
        }
        db.collection('users').doc(uid)
          .update(updateUserState)
          .then(()=>{
            dispatch(updateUserStateAction(updateUserState))
            dispatch(push('/user/mypage'))
          }).catch((error)=>{
            // stripe側には顧客情報が保存されている
            alert('firebaseでの登録に失敗しました')
            return;
          })
        }
    }else{
      // 既存情報を更新する
      // 既存のidを取得する
      const prevPaymentMethodId = getState().users.payment_method_id;
      const updatedPaymentMethod = await updatePaymentMethod(customerId, prevPaymentMethodId, paymentMethodId);
      

      if(!updatedPaymentMethod){
        alert('お客様情報の登録に失敗しました')
      }else{
        // 新しくfirebaseへ保存する
        const userState = {
          payment_method_id: paymentMethodId
        }
        db.collection('users').doc(uid)
        .update(userState)
        .then(()=>{
          dispatch(updateUserStateAction(userState))
          alert('お客様情報を更新しました');
          dispatch(push('/user/mypage'))
        }).catch(()=>{
          alert('失敗しました');
        })
      }
    }
  }
}

// ユーザー情報を更新するAPIを叩くメソット
export const updatePaymentMethod = async (customerId, prevPaymentMethodId, nextPaymentMethodId) => {
    const response = await fetch(BASE_URL + '/v1/updatePaymentMethod', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            customerId: customerId,
            prevPaymentMethodId: prevPaymentMethodId,
            nextPaymentMethodId: nextPaymentMethodId,
        })
    });

    const paymentMethodResponse = await response.json();
    const paymentMethod = JSON.parse(paymentMethodResponse.body);
    return paymentMethod.card
}


