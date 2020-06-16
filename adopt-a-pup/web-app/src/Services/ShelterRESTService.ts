import { ShelterService } from "./ShelterService";
import { RESTService } from "./RESTService";
import { Shelter } from "../Models/Shelter";


export default class ShelterRESTService extends RESTService implements ShelterService {

    constructor(baseUrl: string) {
        super(baseUrl, "shelter-service");
    }

    public async create(shelter: Shelter): Promise<string> {
        return this.post("/shelters/create", shelter);
    }

    public async getById(id: string): Promise<Shelter> {
        return this.get<Shelter>(`/shelters/${id}/getShelter`);
    }

    public getAll(): Promise<Shelter[]> {
        return this.get<Shelter[]>("/shelters/getAll");
    }

}
