import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div className="page-toolbar">
          <div className="btn-group">
            <div className="portlet-input input-inline">
              <div className="input-icon right">
                <i className="fa fa-search"></i>
                <input type="text" className="form-control input-circle" placeholder="search..." />
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

export default SearchBar;
