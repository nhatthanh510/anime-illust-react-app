import {
    FETCHING_RANKING_DATA, FETCHING_RANKING_DATA_SUCCESS, FETCHING_RANKING_DATA_FAILURE,
    FETCHING_RANKING_DATA_MORE, FETCHING_RANKING_DATA_MORE_SUCCESS, FETCHING_RANKING_DATA_MORE_FAILURE,
    FETCHING_RANKING_DETAIL, FETCHING_RANKING_DETAIL_SUCCESS, FETCHING_RANKING_DETAIL_FAILURE,
    FETCHING_RANKING_RELATED, FETCHING_RANKING_RELATED_SUCCESS, FETCHING_RANKING_RELATED_FAILURE,
    FETCHING_RANKING_RELATED_MORE, FETCHING_RANKING_RELATED_MORE_SUCCESS, FETCHING_RANKING_RELATED_MORE_FAILURE,
    SEARCH_RANKING_DATA, SEARCH_RANKING_DATA_SUCCESS, SEARCH_RANKING_DATA_FAILURE
}
    from '../actions/constants';
const initialState = {
    data: [],
    dataDetail: {},
    dataRelated: [],
    rankingStatus: {
        isFetching: false,
        dataFetched: false,
        isFetchingMore: false,
        dataMoreFetched: false,
        error: false
    },
    rankingDetailStatus: {
        isFetching: false,
        dataFetched: false,
        error: false
    },
    rankingRelatedStatus: {
        isFetching: false,
        dataFetched: false,
        isFetchingMore: false,
        dataMoreFetched: false,
        error: false
    },
    nextURL: '',
};

export default function rankingReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_RANKING_DATA:
            return {
                ...state,
                rankingStatus: {
                    ...state.rankingStatus,
                    isFetching: true
                }
            };
        case FETCHING_RANKING_DATA_SUCCESS:
            return {
                ...state,
                rankingStatus: {
                    ...state.rankingStatus,
                    isFetching: false,
                    dataFetched: true
                },
                data: action.data.data.illusts,
                nextURL: action.data.data.next_url
            };
        case FETCHING_RANKING_DATA_FAILURE:
            return {
                ...state,
                rankingStatus: {
                    ...state.rankingStatus,
                    isFetching: false,
                    error: true
                }
            };
        case FETCHING_RANKING_DATA_MORE:
            return {
                ...state,
                rankingStatus: {
                    ...state.rankingStatus,
                    isFetchingMore: true
                }
            };
        case FETCHING_RANKING_DATA_MORE_SUCCESS:
            return {
                ...state,
                rankingStatus: {
                    ...state.rankingStatus,
                    isFetchingMore: false,
                    dataMoreFetched: true,
                },
                data: state.data.concat(action.dataMore.data.illusts),
                dataFetched: true,
                nextURL: action.dataMore.data.next_url
            };
        case FETCHING_RANKING_DATA_MORE_FAILURE:
            return {
                ...state,
                rankingStatus: {
                    ...state.rankingStatus,
                    isFetchingMore: false,
                    error: true,
                }
            };
        case FETCHING_RANKING_DETAIL:
            return {
                ...state,
                rankingDetailStatus: {
                    ...state.rankingStatus,
                    isFetching: true
                },
                rankingRelatedStatus: {
                    ...state.rankingRelatedStatus,
                    isFetching: false,
                    dataFetched: false,
                    isFetchingMore: false,
                    dataMoreFetched: false,
                    error: false
                },
            };
        case FETCHING_RANKING_DETAIL_SUCCESS:
            return {
                ...state,
                rankingDetailStatus: {
                    ...state.rankingStatus,
                    isFetching: false,
                    dataFetched: true
                },
                dataDetail: action.dataDetail
            };
        case FETCHING_RANKING_DETAIL_FAILURE:
            return {
                ...state,
                rankingDetailStatus: {
                    ...state.rankingStatus,
                    isFetching: false,
                    error: true
                },
            };
        case FETCHING_RANKING_RELATED:
            return {
                ...state,
                rankingRelatedStatus: {
                    ...state.rankingRelatedStatus,
                    isFetching: true
                }
            };
        case FETCHING_RANKING_RELATED_SUCCESS:
            return {
                ...state,
                rankingRelatedStatus: {
                    ...state.rankingRelatedStatus,
                    isFetching: false,
                    dataFetched: true
                },
                dataRelated: action.data.data.illusts,
                nextURL: action.data.data.next_url
            };
        case FETCHING_RANKING_RELATED_FAILURE:
            return {
                ...state,
                rankingRelatedStatus: {
                    ...state.rankingRelatedStatus,
                    isFetching: false,
                    error: true
                }
            };
        case FETCHING_RANKING_RELATED_MORE:
            return {
                ...state,
                rankingRelatedStatus: {
                    ...state.rankingRelatedStatus,
                    isFetchingMore: true
                }
            };
        case FETCHING_RANKING_RELATED_MORE_SUCCESS:
            return {
                ...state,
                rankingRelatedStatus: {
                    ...state.rankingRelatedStatus,
                    isFetchingMore: false,
                    dataMoreFetched: true
                },
                dataRelated: state.dataRelated.concat(action.dataMore.data.illusts),
                nextURL: action.dataMore.data.next_url
            };
        case FETCHING_RANKING_RELATED_MORE_FAILURE:
            return {
                ...state,
                rankingRelatedStatus: {
                    ...state.rankingRelatedStatus,
                    isFetchingMore: false,
                    error: true
                }
            };
        case SEARCH_RANKING_DATA:
            return {
                ...state,
                rankingStatus: {
                    ...state.rankingStatus,
                    isFetching: true
                }
            };
        case SEARCH_RANKING_DATA_SUCCESS:
            return {
                ...state,
                rankingStatus: {
                    ...state.rankingStatus,
                    isFetching: false,
                    dataFetched: true
                },
                data: action.data.data.illusts,
                nextURL: action.data.data.next_url
            };
        case SEARCH_RANKING_DATA_FAILURE:
            return {
                ...state,
                rankingStatus: {
                    ...state.rankingStatus,
                    isFetching: false,
                    error: true
                }
            };
        default:
            return state;
    }
}
