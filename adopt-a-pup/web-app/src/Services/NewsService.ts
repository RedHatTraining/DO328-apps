export interface NewsService {
    getAll(): Promise<any[]>;
}

export interface News {
    id: string;
    title: string;
    timestamp: string;
}

