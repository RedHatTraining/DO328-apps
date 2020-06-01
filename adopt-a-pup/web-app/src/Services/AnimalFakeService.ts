import { AnimalService, Animal } from "./AnimalService";


export default class AnimalFakeService implements AnimalService {

    public async create(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async getAllAdoptable(): Promise<Animal[]> {
        return [
            {
                animalId: "a1",
                animalName: "Dog 1",
                breed: "Shepherd",
                shelterId: "s1",
                adoptable: true
            }
        ];
    }

    public async getById(id: string): Promise<Animal> {
        return {
            animalId: id,
            animalName: "Dog 1",
            breed: "Shepherd",
            shelterId: "s1",
            adoptable: true
        };
    }

}