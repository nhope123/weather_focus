import {createStore, applyMiddleware, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import weatherReducer from './slice';

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//console.log(weatherReducer)
const store = createStore(
    weatherReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
