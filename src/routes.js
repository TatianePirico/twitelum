import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
// caminho -> componente

import Home from './pages/Home';
import Login from './pages/LoginPage';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';

// criar o component NotFound
// configurar a rota

const Trend = (props) => {
  console.log(props);
  return (<h1>Tela do trend: {props.match.params.trendId}</h1>);
}

// const RotaAutenticada = ({ path, component, exact }) => {
const RotaProtegida = ({ deveEstarAutenticado, redirectTo, ...props }) => {
  const token = localStorage.getItem('token');

  if ((token && deveEstarAutenticado) || (!token && !deveEstarAutenticado)) {
    return <Route {...props} />;
  }

  return <Redirect to={redirectTo} />;
}

const Roteamento = () => {
  return (
    <Switch>
      {/* onde? o quê? */}
      <RotaProtegida path="/" component={Home} exact redirectTo="/login" deveEstarAutenticado />
      {/* <Route path="/" component={Home} exact={true} /> */}
      <RotaProtegida path="/login" component={Login} redirectTo="/" deveEstarAutenticado={false} />

      <Route path="/logout" component={Logout} />
      <Route path="/trend/:trendId" component={Trend} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Roteamento;
// import Rotas from './routes';

// export Roteamento;
// import { Roteamento } from './routes';