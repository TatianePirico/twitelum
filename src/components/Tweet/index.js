import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import If from './../If';
import './tweet.css';

// import * as TweetsService from '../../services/tweets';

class Tweet extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    nomeUsuario: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    avatarUrl: PropTypes.string,
    likeado: PropTypes.bool,
    removivel: PropTypes.bool,
    onDelete: PropTypes.func,
    onSelect: PropTypes.func,
  }
  
  static defaultProps = {
    avatarUrl: '',
    likeado: false,
    removivel: false,
    onDelete: () => {},
    onSelect: null
  }

  state = {
    likeado: this.props.likeado,
    totalLikes: this.props.totalLikes
  }

  handleCurtir = () => {
    const { id, onCurtirTweet } = this.props;
    onCurtirTweet(id)
  }

  handleDelete = () => {
    const { id, onDelete } = this.props;
    onDelete(id)
  }

  handleSelect = (evento) => {
    const { id, onSelect } = this.props;
    const clicouNoFooter = evento.target.closest('.tweet__footer');

    if (onSelect && !clicouNoFooter) {
      onSelect(id);
    }
  }

  render() {
    const {
      avatarUrl,
      nomeUsuario,
      userName,
      children,
      removivel,
      totalLikes,
      likeado
    } = this.props;

    return (
      <article className="tweet" onClick={this.handleSelect} >
        <div className="tweet__cabecalho">
          <img className="tweet__fotoUsuario" src={avatarUrl} alt="" />
          <span className="tweet__nomeUsuario">{nomeUsuario}</span>
          <a href="/"><span className="tweet__userName">@{userName}</span></a>
        </div>
        <p className="tweet__conteudo">
          <span>{children}</span>
        </p>
        <footer className="tweet__footer">
          <button
            className="btn btn--clean"
            onClick={this.handleCurtir}
          >
            <svg
              className={`icon icon--small iconHeart ${likeado ? 'iconHeart--active' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 47.5 47.5"
            >
              <defs>
                <clipPath id="a">
                  <path d="M0 38h38V0H0v38z"></path>
                </clipPath>
              </defs>
              <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                <path d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.632-8.018-4.128-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.773.098-1.52.266-2.242C2.75 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.47.268 2.241"></path>
              </g>
            </svg>
            {totalLikes}
          </button>

          {/* <If cond={removivel}> */}
          {removivel && ( // truthy
            <button
              className="btn btn--blue btn--remove"
              onClick={this.handleDelete}
              // onClick={() => onDelete(id)}
            >
              X
            </button>
          )}
        </footer>
      </article>
    )
  }
}

export default Tweet