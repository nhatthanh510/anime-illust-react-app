import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import topBarHOC from './TopBar/TopBarHOC.jsx';
import SearchBar from '../components/TopBar/SearchBar.jsx';
import Calendar from '../components/TopBar/Calendar.jsx';
import { connect } from 'react-redux';
import { fetchGifData } from '../actions/gif_fetch';

import Grid from './Grid/Grid.jsx';

import 'react-datepicker/dist/react-datepicker.css';

const RankedTopBar = topBarHOC(Calendar, SearchBar);

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
        window.gifDataFetched = this.props.gifData.dataFetched;
    }

    search = (term) => {
      this.props.fetchGifData(term);
    };

    initGrid = () => {
        console.log("gif data")
        console.log(this.props.gifData)
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
    render() {
        return (
            <div className="container-fluid grid-layout">
                <RankedTopBar title="Gif" search = {this.search}/>
              <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true}>
                  <div>
                      {
                          this.props.gifData.isFetching && <div>Loading</div>
                      }
                      {this.props.gifData.data.length ?
                          (
                              <Grid {...this.initGrid()} />
                          ) : null
                      }
                  </div>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        gifData: state.gifData
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchGifData: (params) => dispatch(fetchGifData(params))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Gif);
