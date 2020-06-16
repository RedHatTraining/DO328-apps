import { NewsService } from "./NewsService";
import { News } from "../Models/News";


export default class NewsFakeService implements NewsService {

    public async getAll(): Promise<News[]> {
        return [
            { id: "n1", title: "News 1", timestamp: "1970-01-01 00:00:01" },
            { id: "n2", title: "News 2", timestamp: "1970-01-01 00:00:01" }
        ];
    }
}
