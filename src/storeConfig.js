/**
 * Created by admin on 6/27/2017.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export default function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-disable no-underscore-dangle */
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  // create store using thunk
  /* eslint-enable */
  return store;
}
