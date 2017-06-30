import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
                <Link to="feed">Feed 3</Link>
                <Link to="ranking">Ranking</Link>
            </div>
        );
    }
}

export default App;