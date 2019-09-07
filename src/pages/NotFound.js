import React from 'react';

const NotFound = ({ match }) => (
  <>
    <h1>Você está perdido?</h1>
    <p>A rota {match.url} não foi encontrada</p>
  </>
);

export default NotFound;
