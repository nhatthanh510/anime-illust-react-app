import { FETCHING_USER_WORKS, FETCHING_USER_WORKS_SUCCESS, FETCHING_USER_WORKS_FAILURE }
    from '../actions/constants';
const initialState = {
    data: [],
    userWorkStatus: {
        isFetching: false,
        dataFetched: false,
        isFetchingMore: false,
        dataMoreFetched: false,
        error: false
    },
    nextURL: '',
};

export default function userWorkReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_USER_WORKS:
            return {
                ...state,
                userWorkStatus: {
                    ...state.userWorkStatus,
                    isFetching: true
                }
            };
        case FETCHING_USER_WORKS_SUCCESS:
            return {
                ...state,
                userWorkStatus: {
                    ...state.userWorkStatus,
                    isFetching: false,
                    dataFetched: true
                },
                data: action.data.data.illusts,
                nextURL: action.data.data.next_url
            };
        case FETCHING_USER_WORKS_FAILURE:
            return {
                ...state,
                userWorkStatus: {
                    ...state.userWorkStatus,
                    isFetching: false,
                    error: true
                }
            };
        default:
            return state;
    }
}