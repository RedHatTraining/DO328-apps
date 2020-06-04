import { Residency } from "./Residency";

export interface AdoptionApplication {
    username: string;
    animalId: string;
    residency: Residency;
    squareFootageOfHome: number;
    kidsUnder16: boolean;
    occupation: string;
    ownOtherAnimals: boolean;
    email: string;
}


