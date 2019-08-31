import React from 'react'
import PropTypes from 'prop-types';
import './cabecalho.css'

function Cabecalho({ children }) {
  return (
    <header className="cabecalho">
      <div className="cabecalho__container container">
        <h1 className="cabecalho__logo">
          <a href="/">Twitelum</a>
        </h1>
        { children }
      </div>
    </header>
  )
}

Cabecalho.propTypes = {
  children: PropTypes.node.isRequired
}

export default Cabecalho;