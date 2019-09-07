import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Cabecalho from './../components/Cabecalho'
import NavMenu from './../components/NavMenu'
import Dashboard from './../components/Dashboard'
import Modal from './../components/Modal';
import Widget from './../components/Widget'
import TrendsArea from './../components/TrendsArea'
import Tweet from './../components/Tweet'
import { actions as TweetsActions } from '../ducks/tweets';

class Home extends Component {

  state = {
    novoTweet: '',
    tweetSelecionado: null
  }

  componentDidMount() {
    this.props.dispatch(TweetsActions.listaTweets());
  }

  handleCriaTweet = (evento) => {
    evento.preventDefault();

    this.props.dispatch(TweetsActions.criaTweet(this.state.novoTweet))
      .then(() => this.setState({ novoTweet : ''}));
  }

  handleCloseModal = () => {
    this.setState({
      tweetSelecionado: null
    })
  }

  onSelectTweet = (tweetId) => {
    const tweetSelecionado = this.props.listaDaStore
      .find(tweet => tweet._id === tweetId);

    this.setState({ tweetSelecionado });
  }

  onDeleteTweet = (tweetId) => {
    this.props.dispatch(TweetsActions.deleteTweet(tweetId));
  }

  novoTweetEstaValido() {
    const novoTweetLength = this.state.novoTweet.length;

    return novoTweetLength > 0 && novoTweetLength <= 140;
  }

  render() {
    const { novoTweet, tweetSelecionado } = this.state;
    const { listaDaStore } = this.props;

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
                  <span className={`novoTweet__status ${this.novoTweetEstaValido() ? '' : 'novoTweet__status--invalido'}`} >
                    {novoTweet.length}/140
                  </span>
                  <textarea
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?"
                    onChange={(evento) => {

                      this.setState({
                        novoTweet: evento.target.value,
                      });
                    }}
                    value={novoTweet}
                  />
                </div>
                <button
                  type="submit"
                  className="novoTweet__envia"
                  disabled={!this.novoTweetEstaValido()}
                >
                  Tweetar
                </button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                {/* truthy */}
                {!listaDaStore.length && (
                  <p>Twite alguma coisa! Vamos arranjar treta!</p>
                )}
                {/* adaptação da renderização de tweets */}
                {listaDaStore.map(tweet => (
                  <Tweet
                    key={tweet._id}
                    id={tweet._id}
                    nomeUsuario={`${tweet.usuario.nome} ${tweet.usuario.sobrenome}`}
                    userName={tweet.usuario.login}
                    totalLikes={tweet.totalLikes}
                    removivel={tweet.removivel}
                    likeado={tweet.likeado}
                    avatarUrl={tweet.usuario.foto}
                    onDelete={this.onDeleteTweet}
                    onSelect={this.onSelectTweet}
                  >
                    {tweet.conteudo}
                  </Tweet>
                ))}
              </div>
            </Widget>
          </Dashboard>
        </div>
        <Modal
          isOpen={Boolean(tweetSelecionado)}
          onClose={this.handleCloseModal}
        >
          {tweetSelecionado && (
            <Tweet
              id={tweetSelecionado._id}
              nomeUsuario={`${tweetSelecionado.usuario.nome} ${tweetSelecionado.usuario.sobrenome}`}
              userName={tweetSelecionado.usuario.login}
              totalLikes={tweetSelecionado.totalLikes}
              removivel={tweetSelecionado.removivel}
              likeado={tweetSelecionado.likeado}
              avatarUrl={tweetSelecionado.usuario.foto}
              onDelete={this.onDeleteTweet}
            >
              {tweetSelecionado.conteudo}
            </Tweet>
          )}
        </Modal>
      </Fragment>
    );
  }
}

function mapStateToProps (stateDaStore) {
  return {
    listaDaStore: stateDaStore.tweets.lista
  };
}

export default connect(mapStateToProps)(Home);
