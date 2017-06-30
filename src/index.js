// Set up your application entry point here...
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//Include Metronic Theme styles
import './libs/metronic_theme/plugins/bootstrap/css/bootstrap.min.css';
import './libs/metronic_theme/general/components-md.css';
import './libs/metronic_theme/general/plugins-md.css';
import './libs/metronic_theme/general/layout.css';
import './libs/metronic_theme/general/light.css';
//Include Site styles
import './styles/styles.scss';
import Layout from './components/Layout.jsx';
import Feed from './components/Feed.jsx';
import Ranking from './components/Ranking.jsx';

//Applying Redux
import storeConfig from './storeConfig';
import { Provider } from 'react-redux';

const store = storeConfig();
ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
          <Route path="/" component={Layout}>
              <IndexRoute component={Ranking} />
              <Route path="feed" component={Feed} />
              <Route path="ranking" component={Ranking} />
          </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
);
