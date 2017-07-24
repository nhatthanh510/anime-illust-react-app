import React from 'react';
import topBarHOC from './TopBar/TopBarHOC.jsx';
import SearchBar from '../components/TopBar/SearchBar.jsx';
import Calendar from '../components/TopBar/Calendar.jsx';
import { connect } from 'react-redux';
import { fetchData } from '../actions';
import { fetchGifData } from '../actions';

import Grid from './Grid/Grid.jsx';

import 'react-datepicker/dist/react-datepicker.css';

const RankedTopBar = topBarHOC(Calendar, SearchBar);

class Gif extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        if (!this.props.myData.dataFetched) {
            this.props.fetchGifData();
        }
    }
    initGrid = () => {
        console.info('Init grid successfully');
        
        let gridData = {
            data: this.props.myData.data,
            columns: {
                columnsCount: 4,
                responsive: {
                    lg: 4,
                    md: 3,
                    sm: 2,
                    xs: 1,
                },
                content: {
                    format: (item) => {
                        return (
                            <div>
                                <div className="portlet light">
                                    <div className="portlet-body">
                                        <img className="illust-thumbnail img-responsive" src={item.media[0].mediumgif.url} />
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
        console.log(123)
        console.log(this.props.myData)
        return (
            <div className="container-fluid grid-layout">
                <RankedTopBar title="Gif" />
                <div>
                    {
                        this.props.myData.isFetching && <div>Loading</div>
                    }
                    {this.props.myData.data.length ?
                        (
                            <Grid {...this.initGrid()} />
                        ) : null
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        myData: state.myData
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchGifData: () => dispatch(fetchGifData())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Gif);
