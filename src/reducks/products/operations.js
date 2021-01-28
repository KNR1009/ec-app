import { db, FirebaseTimestamp } from "../../firebase/index";
import { push } from "connected-react-router";
import {fetchProductsAction, deleteProductsAction} from "./actions"


const productsRef = db.collection("products");


// 商品を削除するメソット
export const deleteProduct = (id)=>{
  return async(dispatch, getState) => {
      productsRef.doc(id).delete()
      .then(()=>{
          const prevState = getState().products.list;
         const nextProducts = prevState.filter(product => product.id !== id)
          dispatch(deleteProductsAction(nextProducts))
      })
  }
}



// firebaseから商品情報を取得
export const fetchProducts = (gender, category) => {
  
  return async(dispatch) => {

      let query = productsRef.orderBy('updated_at', 'desc');
        query = (gender !== "") ? query.where('gender', '==', gender) : query;
        query = (category !== "") ? query.where('category', '==', category) : query;


      query.get().then(snapshots => {
          const productList = []
          snapshots.forEach(snapshot => {
            const product = snapshot.data();
            productList.push(product);
          })
          dispatch(fetchProductsAction(productList))
      })
  }
}

// カート商品の注文の処理
export const orderProduct = (productsInCart, price) => {
    return async(dispatch, getState) => {

      const uid = getState().users.uid; // 現在のログインユーザーの取得
      const userRef = db.collection('users').doc(uid) // 現在のログインユーザーのfirebase情報取得
      const timestamp = FirebaseTimestamp.now() // 現在時刻の取得

      let products = {}; // カートの商品を一旦格納する
      let soldOutProducts = []; // 売り切れ商品

      const batch = db.batch();

      // カート内の商品1つ1つに対して処理を行う
      for(const product of productsInCart){
        const snapshot = await  productsRef.doc(product.productId).get(); // カート内の商品idの取得
        const sizes = snapshot.data().sizes; // firebaseのproductコレクションからsize情報を取得

        // sizeのオブジェクトの個数を減らす処理
        const updateSizes = sizes.map(size => {
          // カート商品と一致している場合
          if(size.size === product.size){
            //  カート内部に入れている間に商品が購入された時の処理
             if (size.quantity === 0){
                soldOutProducts.push(product.name);
                return size
             }
            //  新しいサイズのオブジェクトを作成
             return{
               size: size.size,
               quantity: size.quantity - 1
             }
          }else{
            // 個数の変更はなくそのまま返す
            return size
          }
        });
        // 注文履歴を残す
        products[product.productId] = {
              id: product.productId,
              images: product.images,
              name: product.name,
              price: product.price,
              size: product.size
          };

        // バッチ処理を記述する
         batch.update(
          productsRef.doc(product.productId),
            {sizes:updateSizes}
        )

        batch.delete(
          userRef.collection('cart').doc(product.cartId)
        )
      }

       //  在庫がない商品が存在した場合は処理を起こさない
      //  for文の外で実装を行う
        if(soldOutProducts.length > 0) {
          const errormessage = (soldOutProducts.length > 1) ? 
            soldOutProducts.join('と') :
            soldOutProducts[0];
          alert('大変申し訳ございません' + errormessage + 'は在庫切れとなったため注文処理を中断しました')
          return false
        }else{
            // 先ほどのbatch処理を全て行う
          batch.commit()
            .then(()=>{
              // firebaseに注文履歴を残す
                const orderRef = userRef.collection('orders').doc();
                const date = timestamp.toDate();
                // Calculate shipping date which is the date after 3 days
                const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)));

                const history = {
                  amount: price,
                  created_at: timestamp,
                  id: orderRef.id,
                  products: products,
                  shipping_date: shippingDate,
                  updated_at: timestamp
                }

                // 全てが完了したら上記を保存して、注文確認ページへpush
                orderRef.set(history);
                dispatch(push('/'))

            }).catch(()=>{
              alert('注文処理に失敗しました。通信環境もご確認の、もう一度お試しください')
            })
        }
    }
}

export const saveProduct = (
  id,
  name,
  description,
  category,
  gender,
  price,
  images,
  sizes
) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

      const data = {
        category: category,
        description: description,
        gender: gender,
        images: images,
        name: name,
        price: parseInt(price, 10),
        updated_at: timestamp,
        sizes:sizes
      }

      if (id === "") {
            const ref = productsRef.doc()
            data.created_at = timestamp;
            id = ref.id;
            data.id = id;
        }

     return productsRef.doc(id).set(data, {merge: true})
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    
  };
};