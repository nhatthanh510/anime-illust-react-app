import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { fetchRankingDetail, fetchRankingRelatedMore } from '../actions/ranking_fetch';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Grid from './Grid/Grid.jsx';
import ImageView from './ImageView/ImageView.jsx';
import SocialShareButtons from './SocialShare/SocialShareButtons.jsx';
import Progress from "react-progress-2";
import renderHTML from 'react-render-html';
import InfiniteScroll from 'react-infinite-scroller';

class RankingDetail extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        this.props.fetchRankingDetail(this.props.params.id);
    }
    componentWillReceiveProps(newProps) {

        if (newProps.params != this.props.params) {
            this.props.fetchRankingDetail(newProps.params.id);
        }
    }
    componentDidUpdate() {
        this.loadingProgress();
    }
    loadingProgress = () => {
        if (this.props.rankingData.rankingDetailStatus.isFetching) {
            Progress.show();
        }
        else if (this.props.rankingData.rankingDetailStatus.dataFetched) {
            Progress.hideAll();
            if (!this.props.rankingData.rankingRelatedStatus.isFetchingMore &&
                !this.props.rankingData.rankingRelatedStatus.dataMoreFetched) {
                window.scrollTo(0, 0);
            }
        }
    }
    renderImageViewer = () => {
        if (this.props.rankingData.rankingDetailStatus.isFetching) {
            return <div></div>;
        } else {
            if (this.props.rankingData.rankingDetailStatus.dataFetched) {
                let rankingDetail = this.props.rankingData.dataDetail;
                let imageArrays = [];
                if (rankingDetail.meta_pages.length > 0) {
                    for (let i = 0; i < rankingDetail.meta_pages.length; i++) {
                        imageArrays.push(rankingDetail.meta_pages[i].image_urls.px_480mw);
                    }
                } else {
                    imageArrays.push(rankingDetail.image_urls.px_480mw);
                }
                const imageViewSettings = {
                    autoplaySpeed: 3000,
                    autoplay: true,
                    pauseOnHover: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                };
                const imageViewData = {
                    data: imageArrays,
                    imageViewSettings: imageViewSettings
                };
                return (
                    <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true}
                        transitionAppearTimeout={1000} transitionLeaveTimeout={1000} transitionEnterTimeout={1000}>
                        <ImageView {...imageViewData} />
                    </ReactCSSTransitionGroup>
                );
            }
        }
    }

    renderDetailInfo = () => {
        if (this.props.rankingData.rankingDetailStatus.isFetching) {
            return <div></div>;
        } else {
            if (this.props.rankingData.rankingDetailStatus.dataFetched) {
                let rankingDetail = this.props.rankingData.dataDetail;
                return (
                    <div className="portlet light image-info">
                        <div className="portlet-title">
                            <div className="caption">
                                <a href="#">
                                    <i className="fa fa-user-circle-o"></i>
                                    <span className="caption-subject bold uppercase"> {rankingDetail.user.name}</span>
                                </a>
                            </div>
                            <div className="caption caption-right">
                                {this.initSocialShareButtons()}
                            </div>
                        </div>
                        <div className="portlet-body">
                            <div className="total-view">
                                <i className="fa fa-star-o bold"> {rankingDetail.total_bookmarks}</i>
                                <i className="fa fa-eye bold"> {rankingDetail.total_view}</i>
                            </div>
                            <p>
                                {renderHTML(rankingDetail.caption)}
                            </p>
                            {this.renderImageTags(rankingDetail.tags)}
                            <hr />
                            <p className="artist-illust-label bold text-center"> More ilustrations from {rankingDetail.user.name}</p>
                            {this.renderUserWorkSlider()}
                        </div>
                    </div>
                )
            }
        }
    }

    renderImageTags = (tags) => {
        if (tags) {
            return (
                <div>
                    <p className="tag-label bold"><i className="fa fa-tags" /> Tags ({tags.length})</p>
                    <div className="tags">
                        {tags.map(function (tag, key) {
                            return <span key={key} className="label label-default">#{tag.name}</span>;
                        })}
                    </div>
                </div>
            );
        }
    }

    renderUserWorkSlider = () => {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
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
            ],
            lazyLoad: true
        };
        if (this.props.userWorkData.userWorkStatus.isFetching) {
            return;
        } else {
            if (this.props.userWorkData.userWorkStatus.dataFetched) {
                return (
                    <Slider {...settings}>
                        {this.props.userWorkData.data.map(function (userWork, key) {
                            return (
                                <div key={key} className="slider-item">
                                    <a href={"#/ranking/detail/" + userWork.id}>
                                        <img className="img-responsive" src={userWork.image_urls.px_128mw} />
                                    </a>
                                </div>
                            );
                        })}
                    </Slider>
                )
            }
        }
    }

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

    initRelatedGrid = () => {
        let gridData = {
            lazyloading: true,
            data: this.props.rankingData.rankingRelatedStatus.dataFetched ? this.props.rankingData.dataRelated : [],
            columns: {
                columnsCount: 3,
                responsive: {
                    lg: 3,
                    md: 3,
                    sm: 3,
                    xs: 1,
                },
                content: {
                    format: (item) => {
                        return (
                            <div className="portlet light hvr-float">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <div className="caption-subject bold">
                                            <a>
                                                Artist: {item.title}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div className="illust-container">
                                        <a href={"#/ranking/detail/" + item.id}>
                                            <img className="img-responsive" src={item.image_urls.px_480mw} />
                                            {
                                                item.meta_pages.length > 0 ?
                                                    <div className="illust-count">
                                                        <div className="illust-count-overlay"></div>
                                                        <div className="illust-count-content">
                                                            <img src="/images/icon/ic_photos.svg" /> {item.meta_pages.length}
                                                        </div>
                                                    </div> : <span />
                                            }
                                        </a>
                                    </div>
                                    <hr />
                                    <div className=" container-fluid bottom-info">
                                        <div className="row">
                                            <div className="bookmark col-md-6 col-xs-6 text-center">
                                                <i className="fa fa-star"></i> {item.total_bookmarks}
                                            </div>
                                            <div className="view col-md-6 col-xs-6 text-center">
                                                <i className="fa fa-eye"></i> {item.total_view}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
            }
        };
        if (this.props.rankingData.rankingRelatedStatus.isFetching) {
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
    loadMoreRelatedIllusts = () => {
        if (this.props.rankingData.nextURL && !this.props.rankingData.rankingRelatedStatus.isFetchingMore) {
            this.props.fetchRankingRelatedMore(this.props.rankingData.nextURL);
        } else {
            return;
        }
    };
    render() {
        return (
            <div className="container-fluid image-detail">
                <Progress.Component />
                <div className="row">
                    <div className="col-md-offset-1 col-md-5 col-sm-6">
                        <div className="portlet light primary-image">
                            <div className="portlet-body">
                                {this.renderImageViewer()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-6">
                        {this.renderDetailInfo()}
                    </div>
                </div>
                <div className="row related-works grid-layout">
                    <div className="col-md-12">
                        <div className="portlet light">
                            <div className="portlet-title">
                                <div className="caption">
                                    <span className="caption-subject bold uppercase"> Related works</span>
                                </div>
                            </div>
                            <div className="portlet-body">
                                {
                                    <InfiniteScroll
                                        initialLoad={false}
                                        pageStart={0}
                                        loadMore={this.loadMoreRelatedIllusts}
                                        hasMore={this.props.rankingData.nextURL ? true : false}
                                        threshold={5}
                                        loader={
                                            <div className="loader">
                                                <div className="ball-pulse"><div></div><div></div><div></div></div>
                                            </div>}>
                                        {this.initRelatedGrid()}
                                    </InfiniteScroll>
                                }
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
        rankingData: state.rankingData,
        userWorkData: state.userWorkData
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchRankingDetail: (id) => dispatch(fetchRankingDetail(id)),
        fetchRankingRelatedMore: (nextURL) => dispatch(fetchRankingRelatedMore(nextURL))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RankingDetail);