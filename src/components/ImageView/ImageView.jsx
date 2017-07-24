import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class ImageView extends React.Component {
    constructor() {
        super();
        this.renderImageViewItem = (props) => {
            if (props.data.length > 0) {
                if (props.data.length > 1) {
                    let rows = [];
                    for (var i = 0; i < props.data.length; i++) {
                        rows.push(<div key={i}><img className="img-responsive" src={props.data[i]} /></div>);
                    }
                    return <Slider {...props.imageViewSettings}>{rows}</Slider>;
                } else {
                    return <img className="img-responsive" src={props.data[0]} />;
                }
            }else {
                return;
            }
        }
    }

    render() {
        return (
            <div>{this.renderImageViewItem(this.props)}</div>
        );
    }
}

export default ImageView;