export function createStore(reducer) {
  let state;
  const listeners = [];

  return {

    getState(){
      return state;
    },

    dispatch(action){

      // ----> THUNK MIDDLEWARES <----
      if(typeof action === 'function') {
        return action(this.dispatch);
      }
      // ----> END THUNK MIDDLEWARES <----

      state = reducer(state, action);

      listeners.forEach(listener => listener());
    },

    subscribe(listener){
      listeners.push(listener);
    }

  };
}