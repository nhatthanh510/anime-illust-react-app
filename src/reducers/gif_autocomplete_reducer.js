import {
  FETCHING_GIF_AUTOCOMPLETE, FETCHING_GIF_AUTOCOMPLETE_SUCCESS, FETCHING_GIF_AUTOCOMPLETE_FAILURE
} from '../actions/constants';

const initialState = {
  dataFetchedAutoComplete: false,
  isFetchingAutoComplete: false,
  error: false,
  autoCompleteData: []
};

export default function gifAutoCompleteReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_GIF_AUTOCOMPLETE:
        return {
          ...state,
          isFetchingAutoComplete: true,
          dataFetchedAutoComplete: false
        };
    case FETCHING_GIF_AUTOCOMPLETE_SUCCESS:
      return {
        ...state,
        isFetchingAutoComplete: false,
        dataFetchedAutoComplete: true,
        autoCompleteData: action.data
      };
    case FETCHING_GIF_AUTOCOMPLETE_FAILURE:
      return {
        ...state,
        isFetchingAutoComplete: false,
        error: true,
      };
    default:
      return state;
  }
}
