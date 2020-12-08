import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {PrimaryButton, TextDetail, GreyButton} from "../componets/UIkit/index";
import {getUsername} from "../reducks/users/selectors";
import {push} from "connected-react-router";

const UserMyPage = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state)=>state);
  const username = getUsername(selector);
  return(
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">マイページ</h2>
      <div className="module-spacer--medium"></div>
      <TextDetail label={"ユーザー名"} value={username}/>
      <div className="module-spacer--small" />
       <div className="u-text-center">
          <PrimaryButton label={"カート情報の編集"}/> 
          <div className="module-spacer--small" />
          <GreyButton label={"注文履歴の確認"}/> 
       </div>
    </section>
  )
}

export default UserMyPage 
  