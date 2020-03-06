import React, { Component } from 'react';
import Structure from './MainStructure'
import HistoricalDataForm from './HistoricalDataForm'
import WelcomePage from './Welcome'
import SingleCurrencyExchange from './SingleCurrencyExchange'
import Status from './Status'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact >
            <Structure>
              <WelcomePage />
            </Structure>
          </Route>
          <Route path="/exchange" exact>
            <Structure>
              <SingleCurrencyExchange />
            </Structure>
          </Route>
          <Route path="/history" exact>
            <Structure>
              <HistoricalDataForm />
            </Structure>
          </Route>
          {/* <Route path="/status" exact>
            <Structure>
              <Status />
            </Structure>
          </Route> */}
        </Switch>
      </Router>
    )
  }
}

export default App;