import React, { Component } from "react";
import { Link } from 'react-router-dom';

import navMenuStyles from "./navMenu.module.css";

export default class NavMenu extends Component {
  render() {
    return (
      <nav className={navMenuStyles.navMenu}>
        <ul className={navMenuStyles.navMenu__lista}>
          <li className={navMenuStyles.navMenu__item}>
            <Link className={navMenuStyles.navMenu__link} to="/">
              Bem vindo(a): <br />
              <strong>{this.props.usuario}</strong>
            </Link>
          </li>
          <li className={navMenuStyles.navMenu__item}>
            <Link className={navMenuStyles.navMenu__link} to="/">
              Página Inicial
            </Link>
          </li>
          <li className={navMenuStyles.navMenu__item}>
            <Link className={navMenuStyles.navMenu__link} to="/hashtags">
              Hashtags
            </Link>
          </li>
          <li className={navMenuStyles.navMenu__item}>
            <Link
              className={navMenuStyles.navMenu__link}
              to="/login"
              // onClick={() => localStorage.removeItem('token')}
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
