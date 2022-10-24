import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Store/index.js';
import './index.css';
import App from './App';
// import { isDifferent } from './utils.js';

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('current state', store.getState());
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

// const idCheck = (store) => (next) => (action) => {
//   if (action.type === 'ADD_NEWS_IDS') {
//     const previousState = store.getState();
//     const previousNews = previousState.stories.newsIds;
//     const result = next(action);
//     const nextState = store.getState();
//     const nextNews = nextState.stories.newsIds;
//     const isNewsDifferent = isDifferent(previousNews, nextNews);
//     console.log(isNewsDifferent);
//     return isNewsDifferent ? result : null;
//   }
//   return next(action);
// };

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;
const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk, logger), reduxDevtools && reduxDevtools()),
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
