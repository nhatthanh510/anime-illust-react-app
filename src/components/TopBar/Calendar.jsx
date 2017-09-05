import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
    this.props.filterByDateTime(moment(date).format('YYYY-MM-DD'));
  };

  render() {
    return(
          <div className="page-title">
            <h1 className="font-red-mint">
              <span className="bold">{this.props.title}</span>
              <div className="input-icon right">
                <i className="fa fa-calendar" />
                <DatePicker
                  className="form-control input-circle"
                  withPortal
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                />
              </div>
            </h1>
          </div>
    );
  }
}

export default Calendar;
