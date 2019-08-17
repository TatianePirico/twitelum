import React from 'react';

import './header.css';

class Header extends React.Component {

  render() {
    return (
      <header className="header">
        <h1>Twitelum</h1>
        { this.props.children }
      </header>
    );
  }
  
}

export default Header;