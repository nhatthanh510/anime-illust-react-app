import React from 'react';
import PropTypes from 'prop-types';
import GridRow from './GridRow.jsx';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.renderRow = (props) => {
            let rows = [];
            for (let i = 0; i < props.data.length; i += props.columns.columnsCount) {
                rows.push(<GridRow key={i} index={i} data={props.data} columns={props.columns} lazyloading={props.lazyloading} />);
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

Grid.propTypes = {
    lazyloading: PropTypes.bool,
    data: PropTypes.array.isRequired,
    columns:  PropTypes.shape({
        columnsCount: PropTypes.number.isRequired,
        responsive: PropTypes.shape({
            lg: PropTypes.number,
            md: PropTypes.number,
            sm: PropTypes.number,
            xs: PropTypes.number
        }),
        content: PropTypes.shape({
            format: PropTypes.func
        })
    }).isRequired,
};

export default Grid;
