export function criaTweet(token, conteudo) {

  const url = 'https://twitelum-api.herokuapp.com';

  return fetch(`${url}/tweets?X-AUTH-TOKEN=${token}`, {
    method: 'POST',
    body: JSON.stringify({ conteudo })
  }).then(response => response.json());

}


export function listaTweets(token) {

  const url = 'https://twitelum-api.herokuapp.com';

  return fetch(`${url}/tweets?X-AUTH-TOKEN=${token}`) //GET oculto
    .then(response => response.json());
}


export function likeTweet({token, tweetId}) {

  const url = 'https://twitelum-api.herokuapp.com';

  return fetch(`${url}/tweets/${tweetId}/like?X-AUTH-TOKEN=${token}`, {
    method: 'POST'
  }).then(response => response.json());

}
