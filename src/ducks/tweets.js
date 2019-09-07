import * as TweetService from '../services/tweets';

const actionTypes = {
  atualizaLista: 'tweets/atualizaLista',
  novo: 'tweets/novoTweet',
  deleta: 'tweets/removeTweet',
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
  
  [actionTypes.delete]: (store, { tweetId }) => {
    return {
      ...store,
      lista: store.lista.filter((tweet) => tweet._id !== tweetId)
    };
  }
};