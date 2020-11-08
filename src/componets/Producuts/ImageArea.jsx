import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

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