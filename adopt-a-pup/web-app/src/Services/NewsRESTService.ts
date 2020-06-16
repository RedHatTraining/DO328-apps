import { RESTService } from "./RESTService";
import { NewsService } from "./NewsService";
import { News } from "../Models/News";


export default class NewsRESTService extends RESTService implements NewsService {

    constructor(baseUrl: string) {
        super(baseUrl, "news-service");
    }

    public getAll(): Promise<News[]> {
        return this.get<News[]>("/news/puppies");
    }

}
