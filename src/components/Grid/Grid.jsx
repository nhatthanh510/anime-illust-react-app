import React from 'react';
import GridRow from './GridRow.jsx';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.renderRow = (props) => {
            let rows = [];
            for (var i = 0; i < props.data.length; i += props.columns.columnsCount) {
                rows.push(<GridRow key={i} index={i} data={props.data} columns={props.columns} />);
            }
            return rows;
        };
    }

    render() {
        return (
            <div>
                {this.renderRow(this.props)}
            </div>

        );
    }
}

export default Grid;
