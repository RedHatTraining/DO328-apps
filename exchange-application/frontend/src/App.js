import React, { Component } from 'react';
import Structure from './MainStructure'
import HistoricalDataForm from './HistoricalDataForm'
import WelcomePage from './Welcome'
import SingleCurrencyExchange from './SingleCurrencyExchange'
import NewsBoard from './NewsBoard'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


class App extends Component {
  render() {
    var enableNews = process.env.REACT_APP_NEWS_ENABLED
    return (
      <Router basename="/frontend">
        <Switch>
          <Structure>
            <Route path="/" exact >
              <WelcomePage />
            </Route>
            <Route path="/exchange" exact>
              <SingleCurrencyExchange />
            </Route>
            <Route path="/history" exact>
              <HistoricalDataForm />
            </Route>
            {enableNews &&
            <Route path="/news" exact>
              <NewsBoard />
            </Route>
            }
          </Structure>
        </Switch>
      </Router>
    )
  }
}

export default App;
