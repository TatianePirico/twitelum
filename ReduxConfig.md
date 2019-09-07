# Configurando o Redux

## Instalações

`npm install --save redux react-redux redux-thunk`

- redux
- react-redux
- redux-thunk

## 1 - Criar a store

```js
import { createStore } from 'redux';

const store = createStore();
```

## 2 - Criar um reducer

```js
function reducer (state, action) {
  if (action.type === 'MEU_TYPE') {
    return 'mudança de state';
  }

  return state;
}
```

## 3 - Conectar o react com o redux

```js
  // src/index.js
  <Provider store={store} >
    <App />
  </Provider>
```

```js
  // components/MeuComponent
  import { connect } from 'react-redux';

  .
  .
  .

  export default connect()(MeuComponent);
```