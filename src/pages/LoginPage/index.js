import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'

import If from '../../components/If';

import './loginPage.css'

class LoginPage extends Component {

  state = {
		errorMessage: '',
	};

  handleLogin = (event) => {
    event.preventDefault();

    const login = this.refs.login.value;
    const senha = this.refs.senha.value;
    const url = 'http://twitelum-api.herokuapp.com';

    fetch(`${url}/login`, {
      method: 'POST',
      body: JSON.stringify({ login, senha })
    })
      .then(async (response) => {

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          this.props.history.push('/');
        } else {
          this.setState({ errorMessage: data.message });
        }

      })
      .catch((err) => console.log(err));
  }

  render() {
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

                {
                  <If cond={this.state.errorMessage}>
                    <div className="loginPage__errorBox"> { this.state.errorMessage } </div>
                  </If> 
                }
                
                <div className="loginPage__inputWrap">
                  <button className="loginPage__btnLogin" type="submit"> Logar </button>
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