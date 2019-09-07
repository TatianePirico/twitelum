import * as TweetService from '../services/tweets';

export function listaTweets() {
	
	const token = localStorage.getItem('token');

	return(dispatch) => {
    TweetService.listaTweets(token)
      .then((listaDeTweets) => {
        dispatch({
          type: 'tweets/atualizaLista',
          listaDeTweets
        });
      })
	}
}