import React from 'react';

import './Home.css';
const Layout = props => {
  // const logoutHandler = () => {};

  return <div className='layout'>{props.children}</div>;
};

export default Layout;
