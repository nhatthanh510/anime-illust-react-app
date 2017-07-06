import React from 'react';
import topBarHOC from './TopBar/TopBarHOC.jsx';
import SearchBar from '../components/TopBar/SearchBar.jsx';
import Calendar from '../components/TopBar/Calendar.jsx';
import ImageList from './ImageList.jsx';

import 'react-datepicker/dist/react-datepicker.css';

const RankedTopBar = topBarHOC(Calendar, SearchBar);

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="container-fluid">
              <RankedTopBar/>
              <ImageList/>
            </div>
        );
    }
}

export default App;
