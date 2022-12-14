import React from 'react';

const LargeText = props => {
  return (
    <div className={`input-container input-text-large ${props.classes}`}>
      {props.label && (
        <div className='input-label'>
          <p>{props.label}</p>
        </div>
      )}
      {props.btn && <div className='form-btn'>{props.btn}</div>}
      <textarea
        placeholder={props.placeholder}
        value={props.desc}
        onChange={e => props.setDesc(e.target.value)}
        style={{ direction: props.direction ? 'rtl' : 'ltr' }}
      />
    </div>
  );
};

export default LargeText;
