import React, { useState, createContext } from 'react';

export const NotificacaoContext = createContext({
  mensagem: '',
  setMensagem() { }
});

export const NotificacaoProvider = (props) => {

  const [mensagem, setMensagem] = useState(''); 

  return (
    <NotificacaoContext.Provider
      value={{
        mensagem: mensagem,
        setMensagem: (novaMensagem) => setMensagem(novaMensagem)
      }}>

      {props.children}

      {
        mensagem &&
        <div className="notificacaoMsg" onAnimationEnd={() =>setMensagem('')}>
          {mensagem}
        </div>
      }
    </NotificacaoContext.Provider>
  );
}