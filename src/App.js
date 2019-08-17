import React, { Fragment } from 'react';

import Header from './components/Header';
import NavBar from './components/NavBar';


function App() {
  return (
    <Fragment>

      <Header>
        <NavBar links={['Mensagens', 'Notificações', 'Coisas loucas']}/>
      </Header>
      
    </Fragment>
  );
}

export default App;
