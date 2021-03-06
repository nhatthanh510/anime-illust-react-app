import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchData} from '../actions';

import Grid from './Grid/Grid.jsx';

class ImageList extends Component {
  constructor(props) {
    super(props);
    console.log(props.myData.dataFetched);

  }

  componentDidMount() {
    if (!this.props.myData.dataFetched) {
      this.props.fetchData();
    }
  }
  initGrid = () => {
    console.info('Init grid successfully');
    let gridData  = {
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
                  <div className="portlet-title">
                    <div className="caption">
                      <img width="40px" src={item.avatar} className="img-circle" />
                      <span className="caption-subject bold uppercase">{item.name}</span>
                    </div>
                    <div className="caption caption-right font-yellow-gold">
                      <i className="fa fa-hashtag font-yellow-gold"></i>
                      <span className="caption-subject uppercase">{item.rank}</span>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <img className="illust-thumbnail img-responsive" src={item.mainImage} />
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
    return(
      <div>
        {
          this.props.myData.isFetching && <div>Loading</div>
        }
          { this.props.myData.data.length ?
            (
              <Grid {...this.initGrid()}/>
            ) : null
          }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    myData: state.myData
  };
};

function mapDispatchToProps (dispatch) {
  return {
    fetchData: () => dispatch(fetchData())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ImageList);
