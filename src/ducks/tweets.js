import * as TweetService from '../services/tweets';

const actionTypes = {
  atualizaLista: 'tweets/atualizaLista',
  novo: 'tweets/novoTweet',
  deleta: 'tweets/removeTweet',
  seleciona: 'tweets/selecionaTweet',
  limpaSelecao: 'tweets/limpaSelecao',
  curtir: 'tweets/curtir'
}

export const actions = {

  listaTweets() {
	
    const token = localStorage.getItem('token');
  
    return dispatch => TweetService
      .listaTweets(token)
        .then((listaDeTweets) => {
          dispatch({
            type: actionTypes.atualizaLista,
            listaDeTweets
          });
        })
  },
  
 criaTweet(tweet) {
    
    const token = localStorage.getItem('token');
  
    return dispatch => TweetService
      .criaTweet({ token, conteudo: tweet })
        .then((tweetCriado) => {
          dispatch({
            type: actionTypes.novo,
            novoTweet: tweetCriado
          });
        });
  },
  
  deleteTweet(tweetId) {
    
    const token = localStorage.getItem('token');
  
    return dispatch => TweetService
      .deleteTweet({ token, tweetId })
      .then(() =>
        dispatch({ 
          type: actionTypes.deleta, 
          tweetId 
        }));
  },

  curtir(tweetId) {

    const token = localStorage.getItem('token');

    return dispatch => TweetService
      .curtirTweet({ token, tweetId })
      .then(() =>
        dispatch({ 
          type: actionTypes.curtir,
          tweetId
        }));
  },

  selecionaTweet(tweetId){
    return {
      type: actionTypes.seleciona, 
      tweetId 
    };
  },

  limpaSelecao(){
    return { type: actionTypes.seleciona };
  }

};

export const stateInicial = {
  lista: [],
  tweetSelecionado: ''
};

export const reduceHandler = {
  [actionTypes.atualizaLista]: (store, { listaDeTweets }) => {
    return {
      ...store,
      lista: listaDeTweets
    };
  },

  [actionTypes.novo]: (store, { novoTweet }) => {
    return {
      ...store,
      lista: [novoTweet, ...store.lista]
    };
  },
  
  [actionTypes.deleta]: (store, { tweetId }) => {
    return {
      ...store,
      lista: store.lista.filter((tweet) => tweet._id !== tweetId)
    };
  },

  [actionTypes.curtir]: (store, { tweetId }) => {

    const tweetCurtido = store.lista.find((tweet) => tweet._id === tweetId);
    
    if(tweetCurtido){
      tweetCurtido.likeado = !tweetCurtido.likeado;
      tweetCurtido.totalLikes = tweetCurtido.totalLikes + (tweetCurtido.likeado ? 1 : -1);
    }
    
    return {
      ...store,
      lista: [...store.lista ]
    };
  },

  [actionTypes.seleciona]: (store, { tweetId }) => {
    return {
      ...store,
      tweetSelecionado: tweetId
    };
  },

  [actionTypes.limpaSelecao]: (store) => {
    return {
      ...store,
      tweetSelecionado: ''
    };
  }
};