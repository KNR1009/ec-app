import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getIsSignedIn } from './reducks/users/selectors'
import { useEffect } from 'react';
import { listenAuthState } from './reducks/users/operations';


export const Auth = ({children}) => {

  const dispatch = useDispatch()
  // storeの状態を取得
  const selector = useSelector((state) => state);
  // store内部のログイン状態の確認
  const isSignedIn = getIsSignedIn(selector)

  useEffect(()=>{
      if(!isSignedIn){
        dispatch(listenAuthState())
      }
  }, [])

  if(!isSignedIn){
    return <></>
  }else {
    return children
  }
}

