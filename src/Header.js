import React from 'react';

class Header extends React.Component {

  render() {
    return (
      <header>
        <h1>Twitelum</h1>
        { this.props.children }
      </header>
    );
  }
  
}

export default Header;