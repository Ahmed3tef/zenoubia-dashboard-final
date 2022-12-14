import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { loadSizes } from '../../store/reducers/sizes';
import MiniText from './MiniText';
import Selector from './Selector';
import uploadAndEdit from './upload-edit';

const UploadSize = () => {
  const { t } = useTranslation();
  const token = useSelector(state => state.auth.token);
  const sizes = useSelector(state => state.sizes.sizes);

  const [name, setName] = useState('');
  const [editId, setEditId] = useState('');
  const dispatch = useDispatch();

  const uploadADHandler = () => {
    const config = {
      headers: {
        authorization: token,
      },
    };
    uploadAndEdit(
      editId ? true : false,
      'size',
      editId ? { id: editId, newName: name } : { name },
      config,
      false,
      'Size'
    );
  };
  useEffect(() => {
    dispatch(loadSizes());
  }, []);
  useEffect(() => {
    const size = sizes.find(size => size.id === editId);

    setName(size && size.name ? size.name : '');
  }, [editId]);

  return (
    <div className='container form-container'>
      <div className='mb-3 text-container'>
        <Selector
          label={
            <>
              <p>{t('size')}</p>
            </>
          }
          catId={editId}
          setId={setEditId}
          data={sizes}
          path='size'
        />
      </div>
      <div className='text-container'>
        <MiniText
          placeholder={t('enterName')}
          label={t('userName')}
          setName={setName}
          name={name}
        />
      </div>

      <div className=''>
        <div className='form-btn' onClick={uploadADHandler}>
          {editId ? t('btnUpdate') : t('btnUpload')}
        </div>
      </div>
    </div>
  );
};

export default UploadSize;
