import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import topBarHOC from './TopBar/TopBarHOC.jsx';
import SearchBar from '../components/TopBar/SearchBar.jsx';
import Calendar from '../components/TopBar/Calendar.jsx';
import Progress from "react-progress-2";
import "react-progress-2/main.css";
import "loaders.css/loaders.min.css";
import "hover.css/css/hover-min.css";
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { fetchRankingData, fetchRankingDataMore, fetchRankingDataSearch } from '../actions/ranking_fetch';


import Grid from './Grid/Grid.jsx';

import 'react-datepicker/dist/react-datepicker.css';

const RankedTopBar = topBarHOC(Calendar, SearchBar);

class Ranking extends React.Component {
    constructor() {
        super();
        this.state = {
          mode: 'day',
          date: moment().format('YYYY-MM-DD')
        };
    }
    componentDidMount() {
        if (!window.rankingDataFetched) {
            this.props.fetchRankingData({mode: this.state.mode});
        }
    }
    componentDidUpdate() {
        this.loadingProgress();
        window.rankingDataFetched = this.props.rankingData.rankingStatus.dataFetched;
    }
    loadingProgress = () => {
        if (this.props.rankingData.rankingStatus.isFetching) {
            Progress.show();
        }
        else {
            Progress.hideAll();
        }
    };

    search = (params) => {
        //alert(params.term);
        this.props.fetchRankingDataSearch(params.term);
    };

    filterByDateTime = (date) => {
        this.setState({
          ...this.state,
          date: date,
        });
        this.props.fetchRankingData({
          date: date,
          mode: this.state.mode
        });
    };

    filterByMode = (mode) => {
        this.setState({
          ...this.state,
          mode: mode
        });

        this.props.fetchRankingData({
          mode: mode,
          date: this.state.date
        });
    };

    initGrid = () => {
        let gridData = {
            lazyloading: true,
            data: this.props.rankingData.rankingStatus.dataFetched ? this.props.rankingData.data : [],
            columns: {
                columnsCount: 3,
                responsive: {
                    lg: 3,
                    md: 3,
                    sm: 3,
                    xs: 1,
                },
                content: {
                    format: (item, rankingIndex) => {
                        return (
                            <div className="portlet light hvr-float">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <div className="caption-subject bold">
                                            <a>
                                                <i className="fa fa-user-circle-o"></i> {item.title}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="caption caption-right">
                                        <i className="fa fa-hashtag"></i>
                                        <span className="caption-subject uppercase">{rankingIndex + 1}</span>
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div className="illust-container">
                                        <a href={"#/ranking/detail/" + item.id}>
                                            <img className="img-responsive" src={item.image_urls.px_480mw} />
                                            {
                                                item.meta_pages.length > 0 ?
                                                    <div className="illust-count">
                                                        <div className="illust-count-overlay"></div>
                                                        <div className="illust-count-content">
                                                            <img src="/images/icon/ic_photos.svg" /> {item.meta_pages.length}
                                                        </div>
                                                    </div> : <span />
                                            }
                                        </a>
                                    </div>
                                    <hr />
                                    <div className=" container-fluid bottom-info">
                                        <div className="row">
                                            <div className="bookmark col-md-6 text-center">
                                                <i className="fa fa-star"></i> {item.total_bookmarks}
                                            </div>
                                            <div className="view col-md-6 text-center">
                                                <i className="fa fa-eye"></i> {item.total_view}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
            }
        };
        if (this.props.rankingData.rankingStatus.isFetching) {
            return <div></div>;
        } else {
            return (
                <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true}
                    transitionAppearTimeout={1000} transitionLeaveTimeout={1500} transitionEnterTimeout={1500}>
                    <Grid {...gridData} />
                </ReactCSSTransitionGroup>
            );
        }
    };
    loadMoreRankingIllusts = () => {
        if (this.props.rankingData.nextURL && !this.props.rankingData.rankingStatus.isFetchingMore) {
            this.props.fetchRankingDataMore(this.props.rankingData.nextURL);
        } else {
            return;
        }
    };
    render() {

        return (
            <div className="container-fluid grid-layout">
                <Progress.Component />
                <RankedTopBar
                  search={this.search}
                  filterByDateTime={this.filterByDateTime}
                  filterByMode={this.filterByMode}
                />
                <div>
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.loadMoreRankingIllusts}
                        hasMore={this.props.rankingData.nextURL ? true : false}
                        threshold={5}
                        loader={
                            <div className="loader">
                                <div className="ball-pulse"><div></div><div></div><div></div></div>
                            </div>}>
                        {this.initGrid()}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        rankingData: state.rankingData
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchRankingData: (mode) => dispatch(fetchRankingData(mode)),
        fetchRankingDataMore: (nextUrl) => dispatch(fetchRankingDataMore(nextUrl)),
        fetchRankingDataSearch: (word) => dispatch(fetchRankingDataSearch(word))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
