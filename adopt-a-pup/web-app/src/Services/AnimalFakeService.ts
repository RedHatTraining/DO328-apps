import { AnimalService } from "./AnimalService";
import { Animal } from "../Models/Animal";
import { delay } from "./Delayer";
import {AnimalNotificationRequest} from "../Models/AnimalNotificationRequest";


export default class AnimalFakeService implements AnimalService {

    public async create(): Promise<string> {
        console.log("AnimalFakeService: create() was called!");
        return delay(() => "fake-animal-id");
    }

    public async getAllAdoptable(): Promise<Animal[]> {
        return delay(() => ([
            {
                animalId: "a1",
                animalName: "Dog 1",
                breed: "Shepherd",
                shelterId: "s1",
                adoptable: true,
                weight: 100,
                approximateSize: "L",
                residencyRequired: "HOUSE",
                squareFootageOfHome: 800,
                childSafe: true,
                otherDogSafe: true,
                photoUrl: ""
            },
            {
                animalId: "a1",
                animalName: "Dog 1",
                breed: "Shepherd",
                shelterId: "s1",
                adoptable: true,
                weight: 100,
                approximateSize: "L",
                residencyRequired: "HOUSE",
                squareFootageOfHome: 800,
                childSafe: true,
                otherDogSafe: true,
                photoUrl: ""
            },
            {
                animalId: "a1",
                animalName: "Dog 1",
                breed: "Shepherd",
                shelterId: "s1",
                adoptable: true,
                weight: 100,
                approximateSize: "L",
                residencyRequired: "HOUSE",
                squareFootageOfHome: 800,
                childSafe: true,
                otherDogSafe: true,
                photoUrl: ""
            },
            {
                animalId: "a1",
                animalName: "Dog 1",
                breed: "Shepherd",
                shelterId: "s1",
                adoptable: true,
                weight: 100,
                approximateSize: "L",
                residencyRequired: "HOUSE",
                squareFootageOfHome: 800,
                childSafe: true,
                otherDogSafe: true,
                photoUrl: ""
            }
        ]));
    }

    public async subscribeNotifications(animalNotificationRequest: AnimalNotificationRequest): Promise<void> {
        console.log("AnimalFakeService.subscribeNotifications", animalNotificationRequest);
    }

    public async getById(): Promise<Animal> {
        return delay(() => ({
            animalId: "a1",
            animalName: "Dog 1",
            breed: "Shepherd",
            shelterId: "s1",
            adoptable: true,
            weight: 100,
            approximateSize: "L",
            residencyRequired: "HOUSE",
            squareFootageOfHome: 800,
            childSafe: true,
            otherDogSafe: true,
            photoUrl: ""
        }));
    }

}
