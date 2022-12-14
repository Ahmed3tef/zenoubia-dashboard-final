import React from 'react';

const MiniText = props => {
  let direction;
  if (props.path === 'product') {
    // دا عشان ميحودش يمين غير ف البردوكت بس
    direction = props.direction ? props.direction : '';
  }
  return (
    <div
      className={`${props.classes} input-container input-text-mini`}
      style={{ direction: !props.turnText ? '' : direction }}>
      {props.label && (
        <div className='input-label'>
          <p>{props.label}</p>
        </div>
      )}
      {props.btn && <div className='form-btn'>{props.btn}</div>}
      <input
        autoComplete={'false'}
        // autoComplete='current-password'
        style={{ direction: props.direction ? props.direction : 'ltr' }}
        type={props.type || 'text'}
        placeholder={props.placeholder}
        value={props.name}
        onChange={event => {
          props.setName(event.target.value);
        }}
      />
    </div>
  );
};

export default MiniText;
