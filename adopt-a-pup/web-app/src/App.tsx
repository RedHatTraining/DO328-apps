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
import AnimalDetailsView from "./Views/AnimalDetailsView";
import ShelterDetailsView from "./Views/ShelterDetailsView";
import AnimalCreateView from "./Views/AnimalCreateView";
import Config from "./Config";
import NewsRESTService from "./Services/NewsRESTService";
import SheltersCreateView from "./Views/SheltersCreateView";
import NotificationsView from "./Views/NotificationsView";
import { PhotoStaticListService } from "./Services/PhotoStaticListService";


// Initialize Backend Services
let animalService: AnimalService;
let adoptionService: AdoptionService;
let shelterService: ShelterService;
let newsService: NewsService;
const photoService = new PhotoStaticListService();

if (Config.ADOPTION_SERVICE_URL) {
    adoptionService = new AdoptionRESTService(Config.ADOPTION_SERVICE_URL);
} else {
    console.log("Warning: No adoption service url provided. Using AdoptionFakeService");
    adoptionService = new AdoptionFakeService();
}

if (Config.ANIMAL_SERVICE_URL) {
    animalService = new AnimalRESTService(Config.ANIMAL_SERVICE_URL);
} else {
    console.log("Warning: No animal service url provided. Using AnimalFakeService");
    animalService = new AnimalFakeService();
}

if (Config.SHELTER_SERVICE_URL) {
    shelterService = new ShelterRESTService(Config.SHELTER_SERVICE_URL);
} else {
    console.log("Warning: No shelter service url provided. Using ShelterFakeService");
    shelterService = new ShelterFakeService();
}

if (Config.NEWS_ENABLED && Config.NEWS_SERVICE_URL) {
    newsService = new NewsRESTService(Config.NEWS_SERVICE_URL);
} else {
    console.log("Warning: No news service url provided. Using NewsFakeService");
    newsService = new NewsFakeService();
}



// Declare the root application component
export default class App extends Component {
    render() {
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
                        {Config.NEWS_ENABLED &&
                            <Route path="/news" exact>
                                <NewsView newsService={newsService} />
                            </Route>
                        }
                        <Route path={"/animals/details/:animalId"} render={(props) =>
                            <AnimalDetailsView {...props}
                                animalService={animalService}
                                adoptionService={adoptionService}
                            />} >
                        </Route>
                        <Route path="/manage/shelters/create" exact>
                            <SheltersCreateView shelterService={shelterService} />
                        </Route>
                        <Route path="/manage/animals/create" render={(props) =>
                            <AnimalCreateView {...props}
                                shelterService={shelterService}
                                animalService={animalService}
                                photoService={photoService}
                            />}/>
                        <Route path={"/shelters/:shelterId"} render={(props) =>
                            <ShelterDetailsView {...props}
                                shelterService={shelterService}
                                adoptionService={adoptionService}
                            />} />
                        <Route path={"/notifications"} render={() =>
                            <NotificationsView animalService={animalService}/>
                        }/>
                    </Structure>
                </Switch>
            </Router>
        );
    }
}
