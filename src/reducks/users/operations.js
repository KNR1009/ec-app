import {signInAction} from "./actions";
import {push} from 'connected-react-router';
import {auth, FirebaseTimestamp ,db} from '../../firebase/index'
import { useDispatch } from "react-redux";

export const signIn = () => {
  // コールバック関数を返り値として持つようにする
  return async(dispatch, getState) => {
  // 現在のstateを取得する
  const state = getState();
  const isSignedIn = state.users.isSignedIn;

  // ログイン状態だった場合にgithubんおAPIを叩く(非同期処理)
  if(!isSignedIn){
    const url = "https://api.github.com/users/aponasi178cm";

    // 非同期処理を記述
    const response = await fetch(url).then(res => res.json()).catch(()=>null)

    console.log(response);

    const username = response.login;

    // 取得したレスポンスをstoreに格納する
    dispatch(signInAction({
      isSignedIn: true,
      uid: '1011',
      username: username
    }))
    };

    // 成功したらHomeに遷移する
    dispatch(push('/'));
  }

  // 上記の記述を先ほどのLoginコンポーネントのクリック時のイベントで発火するようにする
}

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