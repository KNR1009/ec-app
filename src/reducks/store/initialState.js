// こちらにstateの初期状態を記述する

const initialState = {
  products:{
    list:[]
  },
  users: {
    isSignedIn: false,
    role: "",
    uid: "",
    username: ""
  },
};

export default initialState