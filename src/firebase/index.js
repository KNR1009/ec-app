// エントリーポイント
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import {firebaseConfig} from "./config";

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
// サーバーから現在の時刻を取得する
export const FirebaseTimestamp = firebase.firestore.Timestamp;