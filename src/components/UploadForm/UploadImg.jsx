import React, { useRef, useState } from 'react';
import imgIcon from '../../assets/Add Photo.svg';
import { APIBase } from '../../store/reducers/api';
import './UploadForm.css';

const UploadImg = props => {
  const [imgFile, setImgFile] = useState();
  const [preview, setPreview] = useState(
    props.existingImg ? APIBase + props.existingImg : null
  );

  const fileImgInput = useRef(null);

  // useEffect(() => {
  //   // if (preview) return;
  //   if (props.existingImg) setPreview(props.existingImg);
  // }, [props.existingImg]);

  const onAddImage = e => {
    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);
      setPreview(window.URL.createObjectURL(e.target.files[0]));

      // console.log(e.target.files[0]);
      // console.log(e.target.files[0].name.replace(/\.[^/.]+$/, ''));

      props.setImg(e.target.files[0]);
      if (props.setImgAlt) {
        props.setImgAlt(e.target.files[0].name.replace(/\.[^/.]+$/, ''));
      }
      return;
    }
  };
  // useEffect(() => {
  //   props.setImg(imgFile);
  // }, [imgFile]);

  // console.log(preview);
  // console.log(props.existingImg);

  let uploaderClass, previewClass;
  if (props.profile) {
    uploaderClass = 'img-uploader-profile';
    previewClass = 'profile-preview';
  }
  if (props.product) {
    uploaderClass = 'img-uploader-product';
    previewClass = 'product-preview';
  } else {
    uploaderClass = 'img-uploader';
    previewClass = 'preview';
  }
  if (props.classes) {
    uploaderClass += props.classes;
  }
  // console.log(preview);
  return (
    <div className={uploaderClass}>
      {props.title && (
        <div className='input-label'>
          <p>{props.title}</p>
        </div>
      )}
      <div className='upload-card'>
        <div
          id='preview'
          className={previewClass}
          onClick={() => fileImgInput.current && fileImgInput.current.click()}>
          <div className='image-container'>
            {/* <img src={preview} alt='prev' /> */}
            <img
              src={preview || imgIcon}
              id='image'
              alt='Thumbnail'
              className={preview ? 'imgHeight' : ''}
            />
          </div>

          <input
            style={{ display: 'none' }}
            filename={imgFile}
            onChange={onAddImage}
            ref={fileImgInput}
            type='file'
            accept='image/*'
            id='image-selection-btn'
          />
        </div>
      </div>
    </div>
  );
};

export default UploadImg;
