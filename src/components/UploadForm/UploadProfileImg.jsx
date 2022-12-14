import React, { useEffect, useRef, useState } from 'react';

import imgIcon from '../../assets/Add Photo.svg';
import userImagePlaceholder from '../../assets/sidebar-plcaeholder.png';
let firstRender = true;

const UploadProfileImg = props => {
  const [imgFile, setImgFile] = useState();
  const [preview, setPreview] = useState(
    props.existingImg ? props.existingImg : null
  );
  const fileImgInput = useRef(null);

  useEffect(() => {
    // if (preview) return;
    if (firstRender && props.existingImg) {
      setPreview(props.existingImg ? props.existingImg : userImagePlaceholder);
      firstRender = false;
    }
  }, [props.existingImg]);
  // useEffect(() => {
  //   // if (preview) return;
  //   if (preview) setPreview(props.existingImg);
  // }, [preview]);

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
    }
  };

  // useEffect(() => {
  //   props.setImg(imgFile);
  // }, [imgFile]);

  let uploaderClass, previewClass;
  if (props.profile) {
    uploaderClass = 'img-uploader-profile';
    previewClass = 'profile-preview';
  }

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
              alt='Profile'
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

export default UploadProfileImg;
