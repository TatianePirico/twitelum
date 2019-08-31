export function criaTweet(token, conteudo) {

  const url = 'https://api-twitelum.herokuapp.com';

  return fetch(`${url}/tweets?X-AUTH-TOKEN=${token}`, {
    method: 'POST',
    body: JSON.stringify({ conteudo })
  }).then(response => response.json());

}