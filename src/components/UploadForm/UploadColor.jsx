import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { loadColors } from '../../store/reducers/colors';
import MiniText from './MiniText';
import Selector from './Selector';
import uploadAndEdit from './upload-edit';

const UploadColor = () => {
  const { t } = useTranslation();
  const token = useSelector(state => state.auth.token);
  const colors = useSelector(state => state.colors.colors);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
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
      'color',
      editId
        ? { id: editId, newName: name, newHexValue: value }
        : { name, hexValue: value },
      config,
      false,
      'Color'
    );
    setEditId(0);
    setName('');
    setValue('#000');
  };
  useEffect(() => {
    dispatch(loadColors());
  }, []);
  useEffect(() => {
    const color = colors.find(color => color.id === editId);

    setName(color && color.name ? color.name : '');
    setValue(color && color.hexValue ? color.hexValue : '#000000');
  }, [editId]);

  return (
    <div className='container form-container'>
      <div className='mb-3 text-container'>
        <Selector
          label={<p>{t('color')}</p>}
          id={editId}
          setId={setEditId}
          data={colors}
          path='color'
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
      <div className='text-container'>
        <label
          htmlFor='color-picker'
          style={{
            marginInlineEnd: '55rem',
            fontSize: '1.6rem',
            fontWeight: '800',
            color: 'var(--color-main-darker)',
          }}>
          {t('colorDegree')}
        </label>
        <input
          type='color'
          id='color-picker'
          name='color-picker'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>

      <div>
        <div className='form-btn' onClick={uploadADHandler}>
          {editId ? t('btnUpdate') : t('btnUpload')}
        </div>
      </div>
    </div>
  );
};

export default UploadColor;
