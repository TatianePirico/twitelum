import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'
import If from '../../components/If';

import { NotificacaoContext } from './../../contexts/notificacao';
// import { logar } from '../../services/login';
import * as LoginService from '../../services/login';

import './loginPage.css'

class LoginPage extends Component {
  static contextType = NotificacaoContext;

  state = {
    errorMessage: ''
  }

  // handleLogin() {} -> precisa de um bind
  handleLogin = (evento) => {
    evento.preventDefault();

    const login = this.refs.login.value;
    const senha = this.refs.senha.value;

    LoginService.logar(login, senha)
      .then(({ data, respostaOk }) => {
        if (respostaOk) {
          localStorage.setItem('token', data.token);
          this.context.setMensagem('Login efetuado com sucesso! Bem vindo!');
          this.props.history.push('/');
        } else {
          // console.log(data);
          this.setState({ errorMessage: data.message });
        }
      }).catch(err => console.log(err));

    // XMLHttpRequest
    // IE 6 -> axios
    // fetch('https://api-twitelum.herokuapp.com/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ login, senha })
    // }).then(async (resposta) => {
    //   // console.log('resposta:', resposta);
    //   // console.log('resposta.body:', resposta.body); // Readable Stream

    //   // resposta.status === 200
    //   // if (!resposta.ok) throw new Error();
    //   const data = await resposta.json();

    //   if (resposta.ok) {
    //     localStorage.setItem('token', data.token);
    //     this.context.setMensagem('Login efetuado com sucesso! Bem vindo!');
    //     this.props.history.push('/');
    //   } else {
    //     // console.log(data);
    //     this.setState({ errorMessage: data.message });
    //   }
    // }).catch(err => console.log(err));
  }

  render() {
    // console.log(this.props.history);
    console.log(this.context);

    return (
      <Fragment>
        <Cabecalho />
        <div className="loginPage">
          <div className="container">
            <Widget>
              <h2 className="loginPage__title">Seja bem vindo!</h2>

              <form className="loginPage__form" action="/" onSubmit={this.handleLogin}>
                <div className="loginPage__inputWrap">
                  <label className="loginPage__label" htmlFor="login">Login</label>
                  <input ref="login" className="loginPage__input" type="text" id="login" name="login" />
                </div>
                <div className="loginPage__inputWrap">
                  <label className="loginPage__label" htmlFor="senha">Senha</label>
                  <input ref="senha" className="loginPage__input" type="password" id="senha" name="senha" />
                </div>

                <If cond={this.state.errorMessage}>
                  <div className="loginPage__errorBox">
                    {this.state.errorMessage}
                  </div>
                </If>

                <div className="loginPage__inputWrap">
                  <button className="loginPage__btnLogin" type="submit">
                    Logar
                  </button>
                </div>
              </form>
            </Widget>
          </div>
        </div>
      </Fragment>
    )
  }
}


export default LoginPage