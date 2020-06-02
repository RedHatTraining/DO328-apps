import React, { Component } from "react";
import Structure from "./Layout";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
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
import AnimalDetails from "./Components/AnimalDetails";
import AnimalDetailsView from "./Views/AnimalDetailsView";


// Backend SERVICES
let animalService: AnimalService;
let adoptionService: AdoptionService;
let shelterService: ShelterService;
let newsService: NewsService;

if (process.env.REACT_APP_ADOPTION_SERVICE_URL) {
    adoptionService = new AdoptionRESTService(process.env.REACT_APP_ADOPTION_SERVICE_URL || "");
} else {
    console.log("Using AdoptionFakeService");
    adoptionService = new AdoptionFakeService();
}

if (process.env.REACT_APP_ANIMAL_SERVICE_URL) {
    animalService = new AnimalRESTService(process.env.REACT_APP_ANIMAL_SERVICE_URL || "");
} else {
    console.log("Using AnimalFakeService");
    animalService = new AnimalFakeService();
}

if (process.env.REACT_APP_SHELTER_SERVICE_URL) {
    shelterService = new ShelterRESTService(process.env.REACT_APP_SHELTER_SERVICE_URL || "");
} else {
    console.log("Using ShelterFakeService");
    shelterService = new ShelterFakeService();
}

if (process.env.REACT_APP_SHELTER_SERVICE_URL) {
    shelterService = new ShelterRESTService(process.env.REACT_APP_SHELTER_SERVICE_URL || "");
} else {
    console.log("Using ShelterFakeService");
    shelterService = new ShelterFakeService();
}

// TODO: Create REST News service
newsService = new NewsFakeService();


// MAIN APP
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
                        <Route path={"/animals/:animalId"} render={ (props) =>
                            <AnimalDetailsView {...props}
                                animalService={animalService}
                                adoptionService={adoptionService}
                            /> } >
                        </Route>
                    </Structure>
                </Switch>
            </Router>
        );
    }
}
