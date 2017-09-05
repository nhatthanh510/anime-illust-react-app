import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import _ from 'lodash';
import '../../styles/gif.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term : ''
    };
  }

  static defaultProps = {
    noResultsText: '',
    filterByMode: () => {}
  };

  handleSubmit = _.debounce(() => {
    let term = this.state.term.trim();
    if (!term) {
      return false;
    }
    this.props.search({term: this.state.term});
  }, 300);

  onInputChange = _.debounce(( value ) => {
    if (typeof this.props.onFetchingData == 'function') {
      this.props.onFetchingData(value);
    }
    this.setState({term: value});
  }, 300);

  onValueClick = ( value ) => {
    this.setState({term: value.value});
  };

  onInputKeyDown = (e) => {
    switch (e.keyCode) {
      case 13:
        _.debounce(this.handleSubmit(e), 300);
        break;
    }
  };

  filterByModeHandler = (mode) => {
    this.props.filterByMode(mode);
  };

  render() {
    return(
        <div className="page-toolbar">
          <div className="btn-group">
            <div className="portlet-input input-inline">
              <div className="input-icon right">
                <form onSubmit={ this.handleSubmit} className="search-form">
                  <Select
                    name="form-field-name"
                    value={this.state.term}
                    options={this.props.options}
                    onInputChange={this.onInputChange}
                    onChange={this.onValueClick}
                    onBlurResetsInput={false}
                    isLoading={this.props.isLoading}
                    onInputKeyDown={this.onInputKeyDown}
                    noResultsText={this.props.noResultsText}
                  />
                  <a className="btn blue-chambray search-button" href="javascript:;" onClick={this.handleSubmit}>
                    <i className="fa fa-photo"></i> Search
                  </a>
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
                <a href="javascript:;" onClick={this.filterByModeHandler.bind(null, 'day')}>
                  <i className="fa fa-pencil"></i> By Day </a>
              </li>
              <li>
                <a href="javascript:;" onClick={this.filterByModeHandler.bind(null, 'month')}>
                  <i className="fa fa-trash-o"></i> By Month </a>
              </li>
              <li>
                <a href="javascript:;" onClick={this.filterByModeHandler.bind(null, 'year')}>
                  <i className="fa fa-ban"></i> By Year </a>
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

export default SearchBar;
