// こちらにstateの初期状態を記述する

const initialState = {
  products:{
    list:[]
  },
  users: {
    cart: [],
    email:"",
    isSignedIn: false,
    orders:[],
    role: "",
    uid: "",
    username: ""
  },
};

export default initialState