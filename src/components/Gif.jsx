import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import topBarHOC from './TopBar/TopBarHOC.jsx';
import SearchBar from '../components/TopBar/SearchBar.jsx';
import Calendar from '../components/TopBar/Calendar.jsx';
import InfiniteScroll from 'react-infinite-scroller';
import Progress from "react-progress-2";
import "react-progress-2/main.css";
import "loaders.css/loaders.min.css";
import "hover.css/css/hover-min.css";
import { connect } from 'react-redux';
import { fetchGifData, fetchGifAutoComplete, fetchGifDataMore } from '../actions/gif_fetch';
import {bindActionCreators} from 'redux';

import Grid from './Grid/Grid.jsx';

import 'react-datepicker/dist/react-datepicker.css';

const RankedTopBar = topBarHOC(SearchBar);

class Gif extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {

        if (!window.gifDataFetched) {
            this.props.fetchGifData();
        }
    }
    componentDidUpdate() {
        this.loadingProgress();
        window.gifDataFetched = this.props.gifData.dataFetched;
    }

    loadingProgress = () => {
      if (this.props.gifData.isFetching) {
        Progress.show();
      }
      else {
        Progress.hideAll();
      }
    };

    search = (term) => {
      this.props.fetchGifData(term);
    };

    onFetchingData = (value) => {
      this.props.fetchGifAutoComplete({term: value});
    };


    initGrid = () => {
        let gridData = {
            lazyloading: true,
            data: this.props.gifData.data,
            columns: {
                columnsCount: 4,
                responsive: {
                    lg: 4,
                    md: 2,
                    sm: 2,
                    xs: 1,
                },
                content: {
                    format: (item) => {
                        return (
                            <div>
                                <div className="portlet light">
                                    <div className="portlet-body">
                                        <a href={'#/gif/detail/' + item.id}>
                                            <img className="illust-thumbnail img-responsive" src={item.media[0].tinygif.url} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
            }
        };
        return gridData;
    };

    loadMoreGif = () => {
      if (!this.props.gifData.isFetchingMore) {
        this.props.fetchGifDataMore(this.props.gifData.nextUrl);
      } else {
        return;
      }
    };

    render() {
        return (
            <div className="container-fluid grid-layout">
                <Progress.Component />
                <RankedTopBar
                  title="Gif"
                  search = {this.search}
                  onFetchingData = {this.onFetchingData}
                  options = {this.props.autoCompleteGifData.autoCompleteData}
                  isLoading = {this.props.autoCompleteGifData.isFetchingAutoComplete}
                  noResultsText={'No results found'}
                />
              <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true}
                  transitionAppearTimeout={1000} transitionLeaveTimeout={1500} transitionEnterTimeout={1500}>
                  <div>
                      {
                         this.props.gifData.isFetching ? ( <div className="loader"><div className="ball-pulse"><div></div><div></div><div></div></div>
                           </div>) :
                         (
                           <InfiniteScroll
                             initialLoad={false}
                             loadMore={this.loadMoreGif}
                             pageStart={0}
                             hasMore={this.props.gifData.next_Pos == 0 ? false : true}
                             threshold={5}
                             loader={
                               <div className="loader">
                                 <div className="ball-pulse"><div></div><div></div><div></div></div>
                               </div>}>
                             {<Grid {...this.initGrid()} />}
                           </InfiniteScroll>
                        )
                      }


                  </div>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        gifData: state.gifData,
        autoCompleteGifData: state.autocompleteData
    };
};

function mapDispatchToProps(dispatch) {
    return {
       // fetchGifData: (params) => dispatch(fetchGifData(params))
      ...bindActionCreators({ fetchGifData, fetchGifAutoComplete, fetchGifDataMore }, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Gif);
