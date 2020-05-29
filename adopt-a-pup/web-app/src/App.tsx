import React, { Component } from "react";
import Structure from "./Layout";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import ShelterList from "./Components/SheltersList";
import ShelterRESTService from "./Services/ShelterRESTService";
import AnimalList from "./Components/AnimalList";


const shelterService = new ShelterRESTService("...");


class App extends Component {
    render() {
        return (
            <Router basename="/frontend">
                <Switch>
                    <Structure>
                        <Route path="/" exact >
                            Main
                        </Route>
                        <Route path="/shelters" exact>
                            <ShelterList shelterService={shelterService} ></ShelterList>
                        </Route>
                        <Route path="/your-animals" exact>
                            <AnimalList></AnimalList>
                        </Route>
                    </Structure>
                </Switch>
            </Router>
        );
    }
}

export default App;
