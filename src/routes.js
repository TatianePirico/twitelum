import React from 'react';
import { Redirect } from 'react-router-dom';

import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/LoginPage';
import Logout from './pages/Logout';

const ErrorPage = ({match}) => {
  return(
    <>
      <h1>Ooops...</h1>
      <span>A rota {match.url} não foi encontrada!</span>
    </>
  );
}

const RotasProtegidas = ({ deveEstarAutenticado, ...props }) => {

  const token = localStorage.getItem('token');

  if((token && deveEstarAutenticado) || (!token && !deveEstarAutenticado)) {
    return <Route {...props} />
  }
  return <Redirect to="login" />
}

const Roteamento = () => {
  return (
    <Switch>
      <RotasProtegidas path="/" component={Home} exact deveEstarAutenticado={true} />
      <Route path="/login" component={Login} deveEstarAutenticado={false}/>
      <RotasProtegidas path="/logout" component={Logout} deveEstarAutenticado={true} />
      <Route path="*" component={ErrorPage}/>
    </Switch>
  );
}

export default Roteamento;