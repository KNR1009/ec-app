import {signInAction} from "./actions";
import {push} from 'connected-react-router';
import {auth, FirebaseTimestamp ,db} from '../../firebase/index'
import { useDispatch } from "react-redux";
import styled from 'styled-components';


// 認証リッスン
export const listenAuthState = () =>{

  // redux-thunkを利用定型文
  return async (dispatch) =>{
    return auth.onAuthStateChanged(user =>{
      // 認証されていた場合はstateを変更
      if(user){   
        const uid = user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            // 以下でアクションを呼び出しsiginの処理を行う
            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );

            dispatch(push("/"));
          });

      }else{
        dispatch(push('/signIn'))
      }
    })
  }
}

// ログイン
export const signIn = (email, password) => {
  const dispatch = useDispatch;
  // コールバック関数を返り値として持つようにする
  return async(dispatch) => {
    // バリデーションを行う
    if ( email === "" || password === "") {
      alert("必須項目が未入力です");
      return false;
    }
    
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      // ユーザが存在すれば処理にすすむ
      if (user) {
        const uid = user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            // 以下でアクションを呼び出しsiginの処理を行う
            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );

            dispatch(push("/"));
          });
      }
    });

  }

  // 上記の記述を先ほどのLoginコンポーネントのクリック時のイベントで発火するようにする
}

// ログアウト

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut()
    .then(()=>{
      dispatch(push('/'))
    })
  }
}

// パスワードを再設定
export const restPassword = (email) => {
  return async (dispatch) => {
    // バリデーションを行う
    if (email === "" ) {
      alert("必須項目が未入力です");
      return false;
    }else{
      auth.sendPasswordResetEmail(email)
      .then(()=>{
        alert('入力されたメールにパスワードリセット用のメールを送りました')
        dispatch(push('/signin'))
      }).catch(()=>{
          alert('パスワードリセットに失敗しました')
      })
    }
  }
}

// 新規登録
export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // Validations
    
      // バリデーションを行う
      if (username === "" || email === "" || password === "") {
        alert("必須項目が未入力です");
        return false;
      }

      if (password !== confirmPassword) {
        alert("パスワードが一致しません。もう一度お試しください");
        return false;
      }
    

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            customer_id: "",
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username,
          };
          db.collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push("/"));
            });
          
          
        }
      })
      
  };
};