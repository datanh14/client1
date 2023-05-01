import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './modules/rootReducer';

const logger = (store: any) => (next: any) => (action: any) => {
  // console.group(action.type);
  // console.info('dispatching', action);
  let result = next(action);
  // console.log('next state', store.getState());
  // console.groupEnd();
  return result;
};

const composeEnhancers =
  (typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;
