import React, { useState, useCallback } from "react";
import { TextField, PrimaryButton } from "../componets/UIkit/index";
import { restPassword } from '../reducks/users/operations'
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const Rest = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");


  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text-center u-text__headline">パスワードを再設定</h2>
      <div className="module-spacer--medium"></div>

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

      <div className="module-spacer--medium"></div>
      <div className="center">
        <PrimaryButton
          label={"パスワードをリセット"}
          onClick={() => dispatch(restPassword(email))}
        />
        <p onClick={() => dispatch(push("/login"))}>
          ログイン画面に戻る
        </p>
        
      </div>
    </div>
  );
};

export default Rest;
