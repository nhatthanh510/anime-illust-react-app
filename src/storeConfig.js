/**
 * Created by admin on 6/27/2017.
 */
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export default function configureStore() {
  let store = createStore(rootReducer, applyMiddleware(thunk)); // create store using thunk
  return store;
}
