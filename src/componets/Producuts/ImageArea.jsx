import React, {useCallback} from 'react'
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import {storage} from '../../firebase/index'


const uploadImage = useCallback(
  (event) => {
    dispatch(showLoadingAction("uploading..."));
    const file = event.target.files;
    let blob = new Blob(file, { type: "image/jpeg" });

    // Generate random 16 digits strings
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => S[n % S.length])
      .join("");

    const uploadRef = storage.ref("images").child(fileName);
    const uploadTask = uploadRef.put(blob);

    uploadTask
      .then(() => {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };
          props.setImages((prevState) => [...prevState, newImage]);
          dispatch(hideLoadingAction());
        });
      })
      .catch(() => {
        dispatch(hideLoadingAction());
      });
  },
  [props.setImages]
);



const ImageArea = (props) => {
  return(
    <div className="u-text-right">
      <span>商品画像を登録する</span>
        <IconButton>
          <AddPhotoAlternateIcon />
          <input type="file" className="u-display-none" id="image" />
        </IconButton>
    </div>
  )
}

export default ImageArea