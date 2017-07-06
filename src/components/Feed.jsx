import React from 'react';
import TopBarHOC from './TopBar/TopBarHOC.jsx';
import SearchBar from './TopBar/SearchBar.jsx';

const FeedTopBar = TopBarHOC(SearchBar);
class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="container-fluid">
                <FeedTopBar />
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
