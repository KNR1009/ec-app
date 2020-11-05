import React, { useState, useCallback } from "react";
import { TextField, PrimaryButton } from "../componets/UIkit/index";
import { signIn } from "../reducks/users/operations";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text-center u-text__headline">ログイン</h2>
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


      <div className="module-spacer--medium"></div>
      <div className="center">
        <PrimaryButton
          label={"アカウントを登録する"}
          onClick={() =>
            dispatch(signIn( email, password))
          }
        />
      </div>
    </div>
  );
};

export default SignIn;
