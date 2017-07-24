import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions';
import Grid from './Grid/Grid.jsx';

class Profile extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        if (!this.props.myData.dataFetched) {
            this.props.fetchData();
        }
    }
    initGrid = () => {
        let gridData = {
            data: this.props.myData.data,
            columns: {
                columnsCount: 3,
                responsive: {
                    lg: 3,
                    md: 3,
                    sm: 2,
                    xs: 1,
                },
                content: {
                    format: (item) => {
                        return (
                            <div>
                                <div className="portlet light">
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
        return (
            <div className="container-fluid profile">
                <div className="row">
                    <div className="col-md-12">
                        <div className="profile-sidebar">

                            <div className="portlet light profile-sidebar-portlet ">

                                <div className="profile-userpic">
                                    <img src="../images/test/avatar.png" className="img-responsive" alt="" /> </div>

                                <div className="profile-usertitle">
                                    <div className="profile-usertitle-name">
                                        <p>れこ太</p>
                                    </div>
                                </div>
                            </div>
                            <div className="portlet light ">
                                <div className="row list-separated profile-stat">
                                    <div className="col-md-6">
                                        <div className="uppercase profile-stat-title"> 307 </div>
                                        <div className="uppercase profile-stat-text"> Illustrations </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="uppercase profile-stat-title"> 100 </div>
                                        <div className="uppercase profile-stat-text"> Manga </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="profile-desc-title">About れこ太</h4>
                                    <p className="profile-desc-text">
                                        谁敢反对哈曼，就打爆他的emmm<br />
                                        weibo.com/baiyereki<br />
                                        最新大人気ゲーミングPCから自作パーツセットモデルまで大特価放出
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="profile-content">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="portlet light ">
                                        <div className="portlet-title tabbable-line">
                                            <div className="caption caption-md">
                                                <span className="caption-subject font-blue-madison bold uppercase">
                                                    れこ太's Works
                                                </span>
                                            </div>
                                            <ul className="nav nav-tabs">
                                                <li className="active">
                                                    <a href="#illust_tab" data-toggle="tab" aria-expanded="false"> Illustrations </a>
                                                </li>
                                                <li>
                                                    <a href="#manga_tab" data-toggle="tab" aria-expanded="true"> Manga </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="portlet-body">
                                            <div className="tab-content">
                                                <div id="illust_tab" className="tab-pane grid-layout active">
                                                    {
                                                        this.props.myData.isFetching && <div>Loading</div>
                                                    }
                                                    {this.props.myData.data.length ?
                                                        (
                                                            <Grid {...this.initGrid() } />
                                                        ) : null
                                                    }
                                                </div>
                                                <div id="manga_tab" className="tab-pane">
                                                    <h3>No Manga</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        myData: state.myData
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(fetchData())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);