import React from 'react';
import TopBar from './TopBar.jsx';
import ImageList from './ImageList.jsx';

import 'react-datepicker/dist/react-datepicker.css';

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="container-fluid">
              <TopBar/>
              <ImageList/>
            </div>
        );
    }
}

export default App;
