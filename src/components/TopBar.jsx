import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class TopBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <div className="page-head">
          <div className="page-title">
            <h1 className="font-red-mint">
              <span className="bold">Daily Rankings</span>
              <div className="input-icon right">
                <i className="fa fa-calendar" />
                <DatePicker
                  className="form-control input-circle"
                  withPortal
                />
              </div>
            </h1>

          </div>
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
        </div>
      </div>
    );
  }
}

export default TopBar;
