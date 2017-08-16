import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { fetchGifRelatedData, fetchGifDetailData, fetchGifRelatedDataMore } from '../actions/gif_fetch';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Grid from './Grid/Grid.jsx';
import ImageView from './ImageView/ImageView.jsx';
import SocialShareButtons from './SocialShare/SocialShareButtons.jsx';
import Progress from "react-progress-2";
import "react-progress-2/main.css";
import "loaders.css/loaders.min.css";
import InfiniteScroll from 'react-infinite-scroller';
class GifDetail extends React.Component {
    constructor() {
        super();
        this.isLoadingMore = false;
    }


    componentDidMount() {
        this.props.fetchGifDetailData(this.props.params.id);
        this.props.fetchGifRelatedData(Math.floor(Math.random() * 500) + 1);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.params != this.props.params) {
            this.props.fetchGifDetailData(newProps.params.id);
            this.props.fetchGifRelatedData(Math.floor(Math.random() * 500) + 1);
        }
    }

    componentDidUpdate() {
        this.loadingProgress();
    }

    loadingProgress = () => {
        if (this.props.gifData.isFetching) {
            Progress.show();
        }
        else if (this.props.gifData.dataFetched) {
            Progress.hide();
            window.scrollTo(0, 0);
        }
    }

    initImageView = () => {
        let imageViewSettings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        };

        let imageData = [];

        if (this.props.gifData.dataDetail.media) {
            imageData.push(this.props.gifData.dataDetail.media[0].mediumgif.url);
        }

        let imageViewData = {
            data: imageData,
            imageViewSettings: imageViewSettings
        };

        if (this.props.gifData.isFetching) {
            return;
        } else {
            return (
                <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true}
                    transitionAppearTimeout={1000} transitionLeaveTimeout={1000} transitionEnterTimeout={1000}>
                    <ImageView key="gif-detail-image-view" {...imageViewData} />
                </ReactCSSTransitionGroup>
            );
        }
    }

    initRelatedGifGrid = () => {
        let gridData = {
            lazyloading: true,
            data: this.props.gifData.dataRelated,
            columns: {
                columnsCount: 4,
                responsive: {
                    lg: 4,
                    md: 2,
                    sm: 2,
                    xs: 1,
                },
                content: {
                    format: (item) => {
                        return (
                            <div>
                                <div className="portlet light">
                                    <div className="portlet-body">
                                        <a href={'#/gif/detail/' + item.id}>
                                            <img className="illust-thumbnail img-responsive" src={item.media[0].tinygif.url} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
            }
        };
        if (this.props.gifData.isFetching) {
            return <div></div>;
        } else {
            return (
                <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true}
                    transitionAppearTimeout={1000} transitionLeaveTimeout={1500} transitionEnterTimeout={1500}>
                    <Grid {...gridData} />
                </ReactCSSTransitionGroup>
            );
        }
    };

    initSocialShareButtons = () => {
        let socialShareButtonSettings = {
            url: window.location.href,
            facebook: true,
            twitter: true,
            googleplus: true
        };
        return (
            <SocialShareButtons {...socialShareButtonSettings} />
        );
    };

    selectValue = (e) => {
        e.target.focus();
        e.target.select();
    }

    loadMoreRelatedGIFs = () => {
        if(this.props.gifData.isFetchingMore) {
            return;
        }
        this.props.fetchGifRelatedDataMore(this.props.gifData.dataRelatedNext);
    }

    initGIFDetailInfo = () => {
        let gifDetails = this.props.gifData.dataDetail.media;
        if (this.props.gifData.isFetching) {
            return <div></div>;
        } else {
            if (gifDetails != null) {
                let gifMedia = gifDetails[0];
                return (
                    <ReactCSSTransitionGroup transitionName="animdetailinfo" transitionAppear={true}
                        transitionAppearTimeout={2000} transitionLeaveTimeout={2000} transitionEnterTimeout={2000}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-3">
                                    <p>Duration</p>
                                </div>
                                <div className="col-md-9">
                                    <span>{gifMedia.mp4.duration}</span> <span> sec</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <p>Dimensions</p>
                                </div>
                                <div className="col-md-9">
                                    <span>{gifMedia.gif.dims[0]}</span> <span>x</span> <span>{gifMedia.gif.dims[1]}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group form-md-line-input">
                                        <input type="text" className="form-control" value={gifMedia.gif.url} onClick={this.selectValue} />
                                        <label htmlFor="form_control_1">GIF URL</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group form-md-line-input">
                                        <input type="text" className="form-control" value={gifMedia.mp4.url} onClick={this.selectValue} />
                                        <label htmlFor="form_control_1">MP4 URL</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ReactCSSTransitionGroup>
                );
            }
        }
    }

    render() {
        return (
            <div className="container-fluid image-detail gif-detail">
                <Progress.Component />
                <div className="row">
                    <div className="col-md-offset-1 col-md-5 col-sm-6">
                        <div className="portlet light primary-image">
                            <div className="portlet-body">
                                {
                                    this.initImageView()
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-6">
                        <div className="portlet light image-info">
                            <div className="portlet-title">
                                <div className="caption bold">
                                    Share to social networks
                                </div>
                                <div className="caption caption-right">
                                    {this.initSocialShareButtons()}
                                </div>
                            </div>
                            <div className="portlet-body">
                                <p className="detail-info-title bold"> GIF Details</p>
                                {this.initGIFDetailInfo()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row related-works grid-layout">
                    <div className="col-md-12">
                        <div className="portlet light">
                            <div className="portlet-title">
                                <div className="caption">
                                    <span className="caption-subject bold uppercase"> More Anime GIFs</span>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div>
                                    <InfiniteScroll
                                        initialLoad={false}
                                        pageStart={0}
                                        loadMore={this.loadMoreRelatedGIFs}
                                        hasMore={true}
                                        threshold={5}
                                        loader={
                                        <div className="loader">
                                            <div className="ball-pulse"><div></div><div></div><div></div></div>
                                        </div>}>
                                        {this.initRelatedGifGrid()}
                                    </InfiniteScroll>
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
        gifData: state.gifData
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchGifDetailData: (id) => dispatch(fetchGifDetailData(id)),
        fetchGifRelatedData: (pos) => dispatch(fetchGifRelatedData(pos)),
        fetchGifRelatedDataMore: (next) => dispatch(fetchGifRelatedDataMore(next))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GifDetail);