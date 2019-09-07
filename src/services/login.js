import config from '../config';

export function logar(login, senha) {
  return fetch(`${config.api}/login`, {
  // return fetch('https://api-twitelum.herokuapp.com/login', {
      method: 'POST',
      body: JSON.stringify({ login, senha })
    }).then(async (resposta) => {
      // console.log('resposta:', resposta);
      // console.log('resposta.body:', resposta.body); // Readable Stream

      // resposta.status === 200
      // if (!resposta.ok) throw new Error();
      const data = await resposta.json();

      return {
        data,
        respostaOk: resposta.ok
      };
    });
}