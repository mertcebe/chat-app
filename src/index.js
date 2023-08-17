import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRouter from './routers/AppRouter';
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));

let initialState = {
  activeUser: null,
  allUsers: false
};

let reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        allUsers: action.payload
      }
    case "SET_USER":
      return {
        ...state,
        activeUser: action.payload
      }
      default:
        return state
  }
}

const store = createStore(reducer);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
