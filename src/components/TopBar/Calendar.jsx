import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class Calendar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
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
    );
  }
}

export default Calendar;
