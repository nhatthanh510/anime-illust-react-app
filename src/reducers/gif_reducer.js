import {
    FETCHING_GIF_DATA, FETCHING_GIF_DETAIL, FETCHING_GIF_DATA_SUCCESS, FETCHING_GIF_DETAIL_SUCCESS,
    FETCHING_GIF_DATA_FAILURE, FETCHING_GIF_DETAIL_FAILURE, FETCHING_GIF_RELATED, FETCHING_GIF_RELATED_SUCCESS,
    FETCHING_GIF_RELATED_FAILURE, FETCHING_GIF_RELATED_MORE, FETCHING_GIF_RELATED_MORE_SUCCESS, FETCHING_GIF_RELATED_MORE_FAILURE,
    FETCHING_GIF_DATA_MORE, FETCHING_GIF_DATA_MORE_SUCCESS, FETCHING_GIF_DATA_MORE_FAILURE
} from '../actions/constants';
const initialState = {
    data: [],
    dataDetail: {},
    dataRelated: [],
    dataRelatedNext: '',
    dataFetched: false,
    dataMoreFetched: false,
    isFetching: false,
    isFetchingMore: false,
    error: false,
    nextUrl: ''
};
export default function gifReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_GIF_DATA:
            return {
                ...state,
                isFetching: true
            };
        case FETCHING_GIF_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                data: action.data.results,
                nextUrl: action.data.nextUrl
            };
        case FETCHING_GIF_DETAIL:
            return {
                ...state,
                isFetching: true
            };
        case FETCHING_GIF_DETAIL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                dataDetail: action.dataDetail
            };
         case FETCHING_GIF_RELATED:
            return {
                ...state,
                isFetching: true
            };
        case FETCHING_GIF_RELATED_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                dataRelated: action.data.results,
                dataRelatedNext: action.data.next
            };
        case FETCHING_GIF_RELATED_MORE:
            return {
                ...state,
                isFetchingMore: true,
                dataFetched: false,
            };
        case FETCHING_GIF_RELATED_MORE_SUCCESS:
            return {
                ...state,
                isFetchingMore: false,
                dataRelated: state.dataRelated.concat(action.dataMore.results),
                dataRelatedNext: action.dataMore.next
            };
        case FETCHING_GIF_DATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        case FETCHING_GIF_DETAIL_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        case FETCHING_GIF_RELATED_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        case FETCHING_GIF_RELATED_MORE_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        case FETCHING_GIF_DATA_MORE:
            return {
              ...state,
              isFetchingMore: true
            };
      case FETCHING_GIF_DATA_MORE_SUCCESS:
            return {
              ...state,
              isFetchingMore: false,
              dataFetched: true,
              dataMoreFetched: true,
              data: [...state.data, ...action.dataMore.results],
              nextUrl: action.dataMore.nextUrl
            };
      case FETCHING_GIF_DATA_MORE_FAILURE:
            return {
              ...state,
              isFetchingMore: false,
              error: true
            };
        default:
            return state;
    }
}
