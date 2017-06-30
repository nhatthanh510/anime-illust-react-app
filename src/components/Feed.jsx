import React from 'react';

class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="page-head">
                    <div className="page-title">
                        <h1 className="font-red-mint">
                           <span className="bold">Anime Feed</span> - <span>(KONACHAN Network)</span>
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
                            <a className="btn red-mint" href="javascript:;" data-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-gear"></i> Change Network <i className="fa fa-angle-down"></i>
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
                <div className="row">
                    <div className="col-md-3">
                        <div className="portlet light">
                            <div className="portlet-title">
                                <div className="caption">
                                    <img width="40px" src="./images/test/avatar.png" className="img-circle" />
                                    <span className="caption-subject bold uppercase">サッカン</span>
                                </div>
                                <div className="caption caption-right font-yellow-gold">
                                    <i className="fa fa-hashtag font-yellow-gold"></i>
                                    <span className="caption-subject uppercase">1</span>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <img className="illust-thumbnail img-responsive" src="./images/test/1.jpg" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="portlet light">
                            <div className="portlet-title">
                                <div className="caption">
                                    <img width="40px" src="./images/test/avatar.png" className="img-circle" />
                                    <span className="caption-subject bold uppercase">サッカン</span>
                                </div>
                                <div className="caption caption-right font-yellow-gold">
                                    <i className="fa fa-hashtag font-yellow-gold"></i>
                                    <span className="caption-subject uppercase">1</span>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <img className="illust-thumbnail img-responsive" src="./images/test/2.jpg" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="portlet light">
                            <div className="portlet-title">
                                <div className="caption">
                                    <img width="40px" src="./images/test/avatar.png" className="img-circle" />
                                    <span className="caption-subject bold uppercase">サッカン</span>
                                </div>
                                <div className="caption caption-right font-yellow-gold">
                                    <i className="fa fa-hashtag font-yellow-gold"></i>
                                    <span className="caption-subject uppercase">1</span>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <img className="illust-thumbnail img-responsive" src="./images/test/3.jpg" />
                                <div className="divider">asd</div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="portlet light">
                            <div className="portlet-title">
                                <div className="caption">
                                    <img width="40px" src="./images/test/avatar.png" className="img-circle" />
                                    <span className="caption-subject bold uppercase">サッカン</span>
                                </div>
                                <div className="caption caption-right font-yellow-gold">
                                    <i className="fa fa-hashtag font-yellow-gold"></i>
                                    <span className="caption-subject uppercase">1</span>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <img className="illust-thumbnail img-responsive" src="./images/test/3.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default App;