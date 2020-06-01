import React, { Component } from "react";
import Structure from "./Layout";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
// import ShelterRESTService from "./Services/ShelterRESTService";
import SheltersView from "./Views/SheltersView";
import NewsView from "./Views/NewsView";
import ShelterFakeService from "./Services/ShelterFakeService";
import NewsFakeService from "./Services/NewsFakeService";
import AnimalFakeService from "./Services/AnimalFakeService";
import AnimalsView from "./Views/AnimalsView";
import HomeView from "./Views/HomeView";
import AdoptionFakeService from "./Services/AdoptionFakeService";
// import ShelterRESTService from "./Services/ShelterRESTService";

// Services to connect to backends

const shelterService = new ShelterFakeService();
// const shelterService = new ShelterRESTService(SERVICE_BASE_URL);

const newsService = new NewsFakeService();
const animalService = new AnimalFakeService();
const adoptionService = new AdoptionFakeService();


// The main React component that runs the whole webapp
export default class App extends Component {
    render() {
        const enableNews = process.env.REACT_APP_NEWS_ENABLED;
        return (
            <Router basename="/frontend">
                <Switch>
                    <Structure>
                        <Route path="/" exact >
                            <HomeView />
                        </Route>
                        <Route path="/shelters" exact>
                            <SheltersView shelterService={shelterService} />
                        </Route>
                        <Route path="/animals" exact>
                            <AnimalsView animalService={animalService} adoptionService={adoptionService} />
                        </Route>
                        {enableNews &&
                        <Route path="/news" exact>
                            <NewsView newsService={newsService} />
                        </Route>
                        }
                    </Structure>
                </Switch>
            </Router>
        );
    }
}
