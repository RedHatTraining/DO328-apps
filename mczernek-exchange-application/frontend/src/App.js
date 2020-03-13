import React, { Component } from 'react';
import Structure from './MainStructure'
import HistoricalDataForm from './HistoricalDataForm'
import WelcomePage from './Welcome'
import SingleCurrencyExchange from './SingleCurrencyExchange'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


class App extends Component {
  render() {
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
          </Structure>
        </Switch>
      </Router>
    )
  }
}

export default App;
