import { createStore } from "redux";

function reducer(state = {counter: 0}, action) {
  switch (action.type) {
    case 'INCR':
      return {
        ...state,
        counter: state.counter + 1,
      };
    case 'DECR':
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}


export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
