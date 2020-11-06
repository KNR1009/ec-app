import React from 'react'
import { getUserId, getUsername } from "../reducks/users/selectors";
import {useSelector, useDispatch} from 'react-redux'
import {signOut} from '../reducks/users/operations'

const Home = () => {
  const selector = useSelector(state => state);
  const uid = getUserId(selector)
  const username = getUsername(selector);
  const dispatch = useDispatch()
  return (
    <>
      <h2>ホーム画面です</h2>
      <p>ユーザーID:{ uid }</p>
      <p>ユーザー名:{ username }</p>
      <button onClick={() => dispatch(signOut())}>ログアウト</button>
    </>
  );
}

export default Home