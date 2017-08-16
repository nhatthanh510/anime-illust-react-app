import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchGifAutoComplete, fetchGifData} from '../../actions/gif_fetch';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {bindActionCreators} from 'redux';



class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  getInitialState() {
    return {
      value: ''
    };
  }

  handleSubmit = () => {
    this.props.search({term: this.input.value});
  };

  getOptions = (input, callback) => {
     if (this.props.autoCompleteGifData.dataFetchedAutoComplete) {
       var data = {
         options : this.props.autoCompleteGifData.autoCompleteData,
         complete : true
       };

       callback(null, data);
    }
  };

  onInputChange = ( value ) => {
    this.props.fetchGifAutoComplete({term: value});
  };

  onValueClick = ( value ) => {
    this.props.fetchGifData({term: value.value});
  };

  render() {
    console.log('Autocomplete');
    console.log(this.props.autoCompleteGifData.dataFetchedAutoComplete);
    console.log(this.props.autoCompleteGifData.autoCompleteData)
    return(
        <div className="page-toolbar">
          <div className="btn-group">
            <div className="portlet-input input-inline">
              <div className="input-icon right">
                <form onSubmit={ this.handleSubmit}>
                  <i className="fa fa-search"></i>
                  <input type="submit"/>
                  <input type="text" className="form-control input-circle" placeholder="search..." ref={ (input) => {this.input = input }} />
                  <Select.Async
                    name="form-field-name"
                    value=""
                    loadOptions={this.getOptions}
                    onInputChange={this.onInputChange}
                    onChange={this.onValueClick}
                  />
                </form>
              </div>
            </div>
            <a className="btn blue-chambray" href="javascript:;">
              <i className="fa fa-calendar"></i> Change Date
            </a>
            <a className="btn red-mint" href="javascript:;" data-toggle="dropdown" aria-expanded="false">
              <i className="fa fa-gear"></i> Change Mode <i className="fa fa-angle-down"></i>
            </a>
            <ul className="dropdown-menu pull-right">
              <li>
                <a href="javascript:;">
                  <i className="fa fa-pencil"></i> Edit </a>
              </li>
              <li>
                <a href="javascript:;">
                  <i className="fa fa-trash-o"></i> Delete </a>
              </li>
              <li>
                <a href="javascript:;">
                  <i className="fa fa-ban"></i> Ban </a>
              </li>
              <li className="divider"> </li>
              <li>
                <a href="javascript:;"> Make admin </a>
              </li>
            </ul>
          </div>
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
    ...bindActionCreators({ fetchGifData, fetchGifAutoComplete }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
