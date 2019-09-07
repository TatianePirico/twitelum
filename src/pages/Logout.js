import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
  localStorage.removeItem('token');
  // props.history.push('/login');

  return <Redirect to="/login"/>;
};

export default Logout;
