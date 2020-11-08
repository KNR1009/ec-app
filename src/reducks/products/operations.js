import { db, FirebaseTimestamp } from "../../firebase/index";
import { push } from "connected-react-router";

const productsRef = db.collection("products");

export const saveProduct = (
  name,
  description,
  price
) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      description: description,
      name: name,
      price: parseInt(price, 10),
      updated_at: timestamp,
    };

   
      const ref = productsRef.doc();
      const id = ref.id;
      data.id = id;
      data.created_at = timestamp;
 

    return productsRef
      .doc(id)
      .set(data)
      .then(() => {
        dispatch(push("/"));
      })
      .catch(() => {
        // throw new Error(error);
        alert('エラーです')
      });
  };
};