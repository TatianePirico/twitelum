import config from '../config';

export function logar(login, senha) {

  return fetch(`${config.api}/login`, {
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