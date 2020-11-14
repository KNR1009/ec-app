import React, { useState, useCallback } from "react";
import { TextInput, PrimaryButton } from "../componets/UIkit/index";
import { signIn } from "../reducks/users/operations";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import styled from "@emotion/styled";

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

      <TextInput
        fullWidth={true}
        label={"メールアドレス"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <TextInput
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
          label={"ログイン"}
          onClick={() => dispatch(signIn(email, password))}
        />
        <div className="module-spacer--medium"></div>
        <Option>
          <p className="noaccount" onClick={() => dispatch(push("/signup"))}>
            アカウントを持っていない方はこちら
          </p>
          <p
            className="passwordrest"
            onClick={() => dispatch(push("/signin/reset"))}
          >
            パスワードを忘れた方はこちら
          </p>
        </Option>
      </div>
    </div>
  );
};

const Option = styled.div`
  p {
    cursor: pointer;
  }
`;

export default SignIn;
