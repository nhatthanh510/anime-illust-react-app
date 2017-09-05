/**
 * Created by admin on 6/28/2017.
 */
import { combineReducers } from 'redux';
import myData from './dataReducer';
import gifData from './gif_reducer';
import rankingData from './ranking_reducer';
import userWorkData from './user_work_reducer';
import autocompleteData from './gif_autocomplete_reducer';

const rootReducer = combineReducers({
  myData,
  gifData,
  rankingData,
  userWorkData,
  autocompleteData
});

export default rootReducer;
