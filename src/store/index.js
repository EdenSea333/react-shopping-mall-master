import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// persistent storage
const initialState = JSON.parse(window.localStorage.getItem('state')) || {};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  const state = store.getState();
  const persist = {
    cart: state.cart,
    total: state.total,
  };

  window.localStorage.setItem('state', JSON.stringify(persist));
});

export default store;
