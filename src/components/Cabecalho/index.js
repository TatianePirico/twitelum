import React from 'react'
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

export default Cabecalho;