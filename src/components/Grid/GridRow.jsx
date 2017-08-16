import React from 'react';
import GridCol from './GridCol.jsx';
class GridRow extends React.Component {
    constructor(props) {
        super(props);
        this.renderCol = (props) => {
            let cols = [];
            for (var i = props.index; i < props.index + props.columns.columnsCount && i < props.data.length; i++) {
                cols.push(<GridCol key={i} data={props.data[i]} columns={props.columns}  lazyloading={props.lazyloading}/>);
            }
            return cols;
        };

    }

    render() {
        return (
            <div className="row">
                {this.renderCol(this.props)}
            </div>
        );
    }
}

export default GridRow;
