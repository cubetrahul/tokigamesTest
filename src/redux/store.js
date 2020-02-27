import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  compose(applyMiddleware(...middlewares), ...enhancers)
);

sagaMiddleware.run(rootSaga);

export default store;
