import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { reduceHandler, stateInicial } from './ducks/tweets';

function tweetsReducer (state = stateInicial, action) {
  
  const actionType = action.type;

  if(reduceHandler[actionType]) 
    return reduceHandler[actionType](state, action);
  
  return state;
}

const store = createStore(
  combineReducers({
    tweets: tweetsReducer,
  }),
  applyMiddleware(reduxThunk)
);

export default store;