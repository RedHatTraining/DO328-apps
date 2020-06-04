import { AnimalService } from "./AnimalService";
import { Animal } from "../Models/Animal";


export default class AnimalFakeService implements AnimalService {

    public async create(): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public async getAllAdoptable(): Promise<Animal[]> {
        return [
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
                otherDogSafe: true
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
                otherDogSafe: true
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
                otherDogSafe: true
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
                otherDogSafe: true
            }
        ];
    }

    public async getById(): Promise<Animal> {
        return             {
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
            otherDogSafe: true
        };
    }

}