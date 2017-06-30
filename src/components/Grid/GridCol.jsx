import React from 'react';
class GridCol extends React.Component {
    constructor(props) {
        super(props);
        this.renderColumns = (props) => {
            var colClass = 'col-lg-' + 12 / props.columns.responsive.lg + ' ' +
                'col-md-' + 12 / props.columns.responsive.md + ' ' +
                'col-sm-' + 12 / props.columns.responsive.sm + ' ' +
                'col-xs-' + 12 / props.columns.responsive.xs;
            return (
                <div className={colClass}>
                    {props.columns.content.format(props.data)}
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