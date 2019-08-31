import React, { Component, Fragment } from 'react';

//Components
import Cabecalho from '../components/Cabecalho';
import Modal from '../components/Modal';
import NavMenu from '../components/NavMenu';
import Dashboard from '../components/Dashboard';
import Widget from '../components/Widget';
import TrendsArea from '../components/TrendsArea';
import Tweet from '../components/Tweet';

import * as TweetsService from '../services/tweets';

class Home extends Component {

  state = {
    novoTweet: '',
    listaTweet: [],
    tweetSelecionado: null
  };

  componentWillMount() {

    const token = localStorage.getItem('token');

    TweetsService.listaTweets(token)
      .then((listaDeTweets) => {
        this.setState({ listaTweet: listaDeTweets });
      })
  }

  novoTweetEstaValido() {
    const novoTweetLength = this.state.novoTweet.length;
    return novoTweetLength <= 140 && novoTweetLength > 0;
  }

  handleCloseModal = () => {
    this.setState({ tweetSelecionado: null });
  }

  onSelectTweet = (tweetId) => {
    const tweetSelecionado = this.state.listaTweet.find(tweet => tweet._id === tweetId);
    this.setState({ tweetSelecionado });
  }

  onDeleteTweet = (id) => {
    const { listaTweet } = this.state;

    this.setState({ listaTweet: listaTweet.filter((tweet) => tweet._id !== id) });
  }

  handleCriaTweet = (event) => {

    event.preventDefault();

    const token = localStorage.getItem('token');

    TweetsService.criaTweet(token, this.state.novoTweet)
      .then((novoTweet) => {
        this.setState({
          listaTweet: [novoTweet, ...this.state.listaTweet],
          novoTweet: '',
        });
      })
      .catch((err) => console.log(err));
  }

  render() {

    const { novoTweet, tweetSelecionado } = this.state;

    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <form className="novoTweet" onSubmit={this.handleCriaTweet}>
                <div className="novoTweet__editorArea">
                  <span className={`novoTweet__status ${this.novoTweetEstaValido() ? '' : 'novoTweet__status--invalido'}`}>
                    {novoTweet.length}/140
									</span>
                  <textarea
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?"
                    onChange={(event) => this.setState({ novoTweet: event.target.value })}
                    value={novoTweet}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`novoTweet__envia `}
                  disabled={!this.novoTweetEstaValido()}
                >Tweetar</button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                {this.renderTweet()}
              </div>
            </Widget>
          </Dashboard>
        </div>

        <Modal
          isOpen={Boolean(this.state.tweetSelecionado)}
          onClose={this.handleCloseModal} >

          {
            tweetSelecionado &&
            <Tweet
              nomeUsuario={`${tweetSelecionado.usuario.nome} ${tweetSelecionado.usuario.sobrenome}`}
              userName={`@${tweetSelecionado.usuario.login}`}
              totalLikes={tweetSelecionado.totalLikes}
              avatarUrl={tweetSelecionado.usuario.foto}
              id={tweetSelecionado._id}
              likeado={tweetSelecionado.likeado}
              //onDeleteTweet={this.onDeleteTweet}
              //removivel={tweetSelecionado.removivel}
              //onSelect={this.onSelectTweet}
            >
              <p className="tweet__conteudo">
                <span>{tweetSelecionado.conteudo}</span>
              </p>
            </Tweet>
          }


        </Modal>

      </Fragment>
    );
  }

  renderTweet() {

    const { listaTweet } = this.state;

    if (!listaTweet.length) return <span>Let's go! Vamos arrumar briga!</span>

    return (
      listaTweet.map((tweet) =>
        <Tweet
          key={tweet._id}
          nomeUsuario={`${tweet.usuario.nome} ${tweet.usuario.sobrenome}`}
          userName={`@${tweet.usuario.login}`}
          totalLikes={tweet.totalLikes}
          avatarUrl={tweet.usuario.foto}
          id={tweet._id}
          likeado={tweet.likeado}
          removivel={tweet.removivel}
          onDeleteTweet={this.onDeleteTweet}
          onSelect={this.onSelectTweet}
        >
          <p className="tweet__conteudo">
            <span>{tweet.conteudo}</span>
          </p>
        </Tweet>
      )
    )
  }
}

export default Home;
