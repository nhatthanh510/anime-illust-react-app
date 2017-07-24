import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Grid from './Grid/Grid.jsx';
import ImageView from './ImageView/ImageView.jsx';

class RankingDetail extends React.Component {
    constructor() {
        super();
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
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

        const imageViewSettings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            adaptiveHeight: true
        };

        const imageViewData = {
            data : ["./images/test/5.png", "./images/test/4.jpg", "./images/test/4.jpg"],
            imageViewSettings : imageViewSettings
        };

        this.state = {
            settings: settings,
            imageViewData : imageViewData
        };
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
        return gridData;
    };
    render() {
        return (
            <div className="container-fluid ranking-detail">
                <div className="row">
                    <div className="col-md-5">
                        <div className="portlet light primary-image">
                            <div className="portlet-body">
                                <ImageView {...this.state.imageViewData}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="portlet light image-info">
                            <div className="portlet-title">
                                <div className="caption">
                                    <img width="40px" src="./images/test/avatar.png" className="img-circle" />
                                    <span className="caption-subject bold uppercase"> サッカン 1</span>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="total-view">
                                    <i className="fa fa-star-o bold"> 15.297</i>
                                    <i className="fa fa-eye bold"> 73.831</i>
                                </div>
                                <p>年夏おすすめオンラインゲー</p>
                                <p>年夏おすすめオンラインゲオンラインゲームをラームをランキング形式でご紹介！提携 年夏おすすめオンラインゲームをランキング形式でご紹介！提携</p>
                                <p className="tag-label bold"><i className="fa fa-tags" /> Tags (10)</p>
                                <div className="tags">
                                    <span className="label label-default">#式でご</span>
                                    <span className="label label-default">#提携</span>
                                    <span className="label label-default">#グ形</span>
                                    <span className="label label-default">#ムを</span>
                                    <span className="label label-default">#キング形式</span>
                                    <span className="label label-default">#年夏おすす</span>
                                    <span className="label label-default">#ライ</span>
                                    <span className="label label-default">#ンラインゲーム</span>
                                    <span className="label label-default">#インゲームをランキング</span>
                                    <span className="label label-default">#年夏お</span>
                                     <span className="label label-default">#ムを</span>
                                    <span className="label label-default">#キング形式</span>
                                    <span className="label label-default">#年夏おすす</span>
                                    <span className="label label-default">#ライ</span>
                                    <span className="label label-default">#ンラインゲーム</span>
                                    <span className="label label-default">#インゲームをランキング</span>
                                </div>
                                <hr />
                                <p className="artist-illust-label bold text-center"> More ilustrations from サッカン</p>
                                <Slider {...this.state.settings}>
                                    <div className="slider-item"><img className="img-responsive" src="./images/test/1.jpg" /></div>
                                    <div className="slider-item"><img className="img-responsive" src="./images/test/2.jpg" /></div>
                                    <div className="slider-item"><img className="img-responsive" src="./images/test/3.jpg" /></div>
                                    <div className="slider-item"><img className="img-responsive" src="./images/test/4.jpg" /></div>
                                    <div className="slider-item"><img className="img-responsive" src="./images/test/1.jpg" /></div>
                                    <div className="slider-item"><img className="img-responsive" src="./images/test/2.jpg" /></div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row related-works grid-layout">
                    <div className="col-md-10">
                        <div className="portlet light">
                            <div className="portlet-title">
                                <div className="caption">
                                    <span className="caption-subject bold uppercase"> Related works</span>
                                </div>
                            </div>
                            <div className="portlet-body">
                                {
                                    this.props.myData.isFetching && <div>Loading</div>
                                }
                                {this.props.myData.data.length ?
                                    (
                                        <Grid {...this.initGrid()} />
                                    ) : null
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
        myData: state.myData
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(fetchData())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RankingDetail);