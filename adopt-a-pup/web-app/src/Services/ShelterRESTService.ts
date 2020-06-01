import { ShelterService, ShelterParams } from "./ShelterService";
import { RESTService } from "./RESTService";
import { Shelter } from "../Models/Shelter";


export default class ShelterRESTService extends RESTService implements ShelterService {

    constructor(baseUrl: string) {
        super(baseUrl, "shelter-service");
    }

    public async create(params: ShelterParams): Promise<void> {
        return this.post("/create", params);
    }

    public getAll(): Promise<Array<Shelter>> {
        return this.get<Array<Shelter>>("/shelters/getAll");
    }
}