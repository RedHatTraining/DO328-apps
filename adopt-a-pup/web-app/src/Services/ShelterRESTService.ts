import { ShelterService } from "./ShelterService";


export default class ShelterRESTService implements ShelterService {

    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    getAll() {
        return [
            "Shelter1",
            "shelter2"
        ];
    }
}