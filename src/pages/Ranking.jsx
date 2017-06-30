import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import Grid from '../components/Grid/Grid.jsx';

class App extends React.Component {
    constructor() {
        super();

        let array = [
            {
                avatar: './images/test/avatar.png',
                name: 'サッカン 1',
                rank: '1',
                mainImage: './images/test/1.jpg'
            },
            {
                avatar: './images/test/avatar.png',
                name: 'サッカン 2',
                rank: '2',
                mainImage: './images/test/1.jpg'
            },
            {
                avatar: './images/test/avatar.png',
                name: 'サッカン 3',
                rank: '3',
                mainImage: './images/test/1.jpg'
            },
            {
                avatar: './images/test/avatar.png',
                name: 'サッカン 4',
                rank: '4',
                mainImage: './images/test/1.jpg'
            },
            {
                avatar: './images/test/avatar.png',
                name: 'サッカン 1',
                rank: '5',
                mainImage: './images/test/1.jpg'
            },
            {
                avatar: './images/test/avatar.png',
                name: 'サッカン 2',
                rank: '6',
                mainImage: './images/test/1.jpg'
            },
            {
                avatar: './images/test/avatar.png',
                name: 'サッカン 3',
                rank: '7',
                mainImage: './images/test/1.jpg'
            },
            {
                avatar: './images/test/avatar.png',
                name: 'サッカン 4',
                rank: '8',
                mainImage: './images/test/1.jpg'
            },
            {
                avatar: './images/test/avatar.png',
                name: 'サッカン 1',
                rank: '9',
                mainImage: './images/test/1.jpg'
            },
            {
                avatar: './images/test/avatar.png',
                name: 'サッカン 2',
                rank: '10',
                mainImage: './images/test/1.jpg'
            },
            {
                avatar: './images/test/avatar.png',
                name: 'サッカン 3',
                rank: '11',
                mainImage: './images/test/1.jpg'
            },
            {
                avatar: './images/test/avatar.png',
                name: 'サッカン 4',
                rank: '12',
                mainImage: './images/test/1.jpg'
            }
        ];

        let gridData = {
            data: array,
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

        this.state = {
            startDate: moment(),
            data: array,
            gridData: gridData
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="page-head">
                    <div className="page-title">
                        <h1 className="font-red-mint">
                            <span className="bold">Daily Rankings</span>
                            <div className="input-icon right">
                                <i className="fa fa-calendar" />
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
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
                <Grid {...this.state.gridData} />
            </div>
        );
    }
}

export default App;
