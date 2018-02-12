import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import userReducer from './reducers/walletReducer';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const rootReducer = combineReducers({
    user: userReducer
  });

  return {
    ...createStore(rootReducer, applyMiddleware(sagaMiddleware, createLogger())),
    runSaga: sagaMiddleware.run
  };
}
