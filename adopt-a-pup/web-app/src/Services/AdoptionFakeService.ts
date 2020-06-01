import { Animal } from "../Models/Animal";
import { AdoptionService } from "./AdoptionService";


export default class AdoptionFakeService implements AdoptionService {

    public async getAdoptableByShelter(): Promise<Animal[]> {
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

    public async applyForAdoption(animal: Animal): Promise<void> {
        console.log(`Adoption application sent for animal ${animal.id}`);
    }

}