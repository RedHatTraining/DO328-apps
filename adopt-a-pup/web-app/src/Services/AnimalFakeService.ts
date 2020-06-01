import { AnimalService } from "./AnimalService";
import { Animal } from "../Models/Animal";


export default class AnimalFakeService implements AnimalService {

    public async create(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async getAllAdoptable(): Promise<Animal[]> {
        return [
            {
                id: "a1",
                name: "Dog 1",
                breed: "Shepherd",
                shelterId: "s1",
                adoptable: true
            }
        ];
    }

    public async getById(id: string): Promise<Animal> {
        return {
            id: id,
            name: "Dog 1",
            breed: "Shepherd",
            shelterId: "s1",
            adoptable: true
        };
    }

}