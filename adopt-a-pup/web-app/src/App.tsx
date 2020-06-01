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
import ShelterRESTService from "./Services/ShelterRESTService";
import AdoptionRESTService from "./Services/AdoptionRESTService";
import AnimalRESTService from "./Services/AnimalRESTService";
import { NewsService } from "./Services/NewsService";
import { AnimalService } from "./Services/AnimalService";
import { AdoptionService } from "./Services/AdoptionService";
import { ShelterService } from "./Services/ShelterService";
// import ShelterRESTService from "./Services/ShelterRESTService";

// Services to connect to backends
let animalService: AnimalService;
let adoptionService: AdoptionService;
let shelterService: ShelterService;
let newsService: NewsService;

// Fake services for frontend-isolated developemtn
shelterService = new ShelterFakeService();
newsService = new NewsFakeService();
animalService = new AnimalFakeService();
adoptionService = new AdoptionFakeService();

// Uncomment to use Real services
// adoptionService = new AdoptionRESTService(process.env.REACT_APP_ADOPTION_SERVICE_URL || "");
// animalService = new AnimalRESTService(process.env.REACT_APP_ANIMAL_SERVICE_URL || "");
// shelterService = new ShelterRESTService(process.env.REACT_APP_SHELTER_SERVICE_URL || "");

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
                            <AnimalsView
                                animalService={animalService}
                                adoptionService={adoptionService}
                            />
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
