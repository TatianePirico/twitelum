export function logar(login, senha) {

  const url = 'https://api-twitelum.herokuapp.com';

  return fetch(`${url}/login`, {
    method: 'POST',
    body: JSON.stringify({ login, senha })
  })
    .then(async (response) => {
      const data = await response.json();

      return {
        data,
        respostaOK: response.ok
      }
    })
}