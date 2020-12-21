// 注文履歴を保存する¥
export const FETCH_ORDER_HISTORY = "FETCH_ORDER_HISTORY";
export const fetchOrderHistoryAction = (history) => {
    return {
        type: "FETCH_ORDER_HISTORY",
        payload: history
    }
}



// カートの変更をこちらに記載する
export const FETCH_PRODUCTS_IN_CART = "FETCH_PRODUCTS_IN_CART";
export const fetchProductsInCartAction = (products) => {
    return {
        type: "FETCH_PRODUCTS_IN_CART",
        payload: products
    }
}

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username,
      email: userState.email
    },
  };
};

// ログアウトした時のアクション
export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn: false,
      uid: "",
      username: "",
    },
  };
};

// クレジットカード情報の変更
export const UPDARE_USER_STATE = "UPDARE_USER_STATE";
export const updateUserStateAction = (userState) => {
  return {
    type: "UPDARE_USER_STATE",
    payload: userState
  };
};
