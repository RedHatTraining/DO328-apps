import { Animal } from "../Models/Animal";
import { AdoptionService } from "./AdoptionService";
import { AdoptionApplication } from "../Models/AdoptionApplication";


export default class AdoptionFakeService implements AdoptionService {

    public async getAdoptableByShelter(): Promise<Animal[]> {
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
                otherDogSafe: true,
                photoUrl: "https://google.com"
            }
        ];
    }

    public async applyForAdoption(adoption: AdoptionApplication): Promise<void> {
        console.log(`Adoption application sent for animal ${adoption.animalId}`);
    }

}
