import React, { Component, createContext } from 'react';

export const NotificacaoContext = createContext('');

export class NotificacaoProvider extends Component {
  
  state = {
    mensagem: 'Olá, eu sou uma mensagem! <3'
  }

  render() {
    return(
      <NotificacaoContext.Provider value={this.state.mensagem}>
        {this.props.children}
      </NotificacaoContext.Provider>
    );
  }

}