import React, {useState, useCallback} from 'react'
import {TextField, PrimaryButton} from '../componets/UIkit/index'
import { signUp } from '../reducks/users/operations'
import { useDispatch } from "react-redux";

const SignUp = ()=>{

   const dispatch = useDispatch();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [username, setUsername] = useState("")

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [setEmail]);

  const inputPassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [setPassword]);

  const inputConfirmPassword = useCallback((e) => {
    setConfirmPassword(e.target.value)
  }, [setConfirmPassword]);

  const inputUsername = useCallback((e) => {
    setUsername(e.target.value)
  }, [setUsername]);

  return (
    <div className="c-section-container">
      <h2 className="u-text-center u-text__headline">アカウント登録</h2>
      <div className="module-spacer--medium"></div>

      <TextField
        fullWidth={true}
        label={"ユーザー名"}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={"text"}
        onChange={inputUsername}
      />
      <TextField
        fullWidth={true}
        label={"メールアドレス"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <TextField
        fullWidth={true}
        label={"パスワード"}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={"password"}
        onChange={inputPassword}
      />
      <TextField
        fullWidth={true}
        label={"パスワード確認"}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={"password"}
        onChange={inputConfirmPassword}
      />

      <div className="module-spacer--medium"></div>
      <div className="center">
        <PrimaryButton
          label={"アカウントを登録する"}
          onClick={() =>
            dispatch(signUp(username, email, password, confirmPassword))
          }
        />
      </div>
    </div>
  );
}

export default SignUp