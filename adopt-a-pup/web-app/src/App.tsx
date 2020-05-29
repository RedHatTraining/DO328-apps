import React, { Component } from "react";
import Structure from "./Layout";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
// import ShelterRESTService from "./Services/ShelterRESTService";
import AnimalList from "./Components/AnimalList";
import SheltersView from "./Views/SheltersView";
import ShelterFakeService from "./Services/ShelterFakeService";
// import ShelterRESTService from "./Services/ShelterRESTService";

// Services to connect to backends
const shelterService = new ShelterFakeService();
// Uncomment to use a real backend
// const shelterService = new ShelterRESTService(SERVICE_BASE_URL);


// The main React component that runs the whole webapp
export default class App extends Component {
    render() {
        return (
            <Router basename="/frontend">
                <Switch>
                    <Structure>
                        <Route path="/" exact >
                            Main
                        </Route>
                        <Route path="/shelters" exact>
                            <SheltersView shelterService={shelterService} />
                        </Route>
                        <Route path="/your-animals" exact>
                            <AnimalList />
                        </Route>
                    </Structure>
                </Switch>
            </Router>
        );
    }
}
