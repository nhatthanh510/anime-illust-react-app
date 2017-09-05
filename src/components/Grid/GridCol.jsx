import React from 'react';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import GridItemPlaceHolder from './GridItemPlaceHolder.jsx';
class GridCol extends React.Component {
    constructor(props) {
        super(props);
        this.renderColumns = (props) => {
            let colClass = 'col-lg-' + 12 / props.columns.responsive.lg + ' ' +
                'col-md-' + 12 / props.columns.responsive.md + ' ' +
                'col-sm-' + 12 / props.columns.responsive.sm + ' ' +
                'col-xs-' + 12 / props.columns.responsive.xs;
            let colContent = props.columns.content.format(props.data, props.index);
            if (props.lazyloading) {
                colContent = (
                    <LazyLoad height={100} offset={[-100, 0]} placeholder={<GridItemPlaceHolder/>}>
                        <ReactCSSTransitionGroup transitionName="gridLazyLoadingAnim" transitionAppear={true} 
                            transitionAppearTimeout={700} transitionEnter={false} transitionLeave={false}>
                            {props.columns.content.format(props.data, props.index)}
                        </ReactCSSTransitionGroup>
                    </LazyLoad>
                );
            }
            
            return (
                <div className={colClass}>
                    {colContent}
                </div>
            );
        }
    }

    render() {
        return (
            this.renderColumns(this.props)
        )
    }
}

export default GridCol;