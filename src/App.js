import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header';
import NavBar from './NavBar';

function App() {
  return (
    <Fragment>
      <Header />
      <NavBar />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>teste</p>
        </header>
      </div>
    </Fragment>
  );
}

export default App;
