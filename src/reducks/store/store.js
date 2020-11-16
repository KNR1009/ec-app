import {
  createStore as reduxCreateStore, //store構築のモジュール
  combineReducers, // 複数のReducerを結合するモジュール
  applyMiddleware // routerで利用するミドルウェアa-ー
} from 'redux';

// ルーターをインポート
import {connectRouter, routerMiddleware} from "connected-react-router";

// 非同期処理を制御するモジュール
import thunk from 'redux-thunk';

// reducersをインポート(作成済み)
import {UserReducer} from '../users/reducers';
import {ProductsReducer} from '../products/reducers'


// storeを作成
export default function createStore(history){
  return reduxCreateStore( // storeの作成を行う
    combineReducers({
      router: connectRouter(history),
      users: UserReducer,
      products:ProductsReducer
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
}
