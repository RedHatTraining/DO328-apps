import Axios, { AxiosInstance } from "axios";



export abstract class RESTService {

    private readonly axiosInstance: AxiosInstance;

    constructor(
        baseURL: string,
        private readonly remoteServiceName: string,
        private readonly timeoutMs = 10000
    ) {
        this.axiosInstance = Axios.create({ baseURL });
    }

    protected async get<T>(url: string): Promise<T> {
        try {
            const r = await this.axiosInstance.get<T>(url, { timeout: this.timeoutMs });
            return r.data;
        } catch (e) {
            throw new RESTConnectionError(e, this.remoteServiceName, e.response?.status);
        }
    }

    protected async post<T, R>(url: string, body: T): Promise<R> {
        try {
            const r = await this.axiosInstance.post<R>(url, body, { timeout: this.timeoutMs });
            return r.data;
        } catch (e) {
            throw new RESTConnectionError(e, this.remoteServiceName, e.response?.status);
        }
    }

}


export class RESTConnectionError extends Error {

    public readonly statusCode: number = 500;
    public readonly description: string;
    public readonly remoteStatusCode: number;

    constructor(error: Error, serviceName: string, remoteStatusCode?: number) {
        super();
        this.message = `An error ocurred when calling the remote service "${serviceName}"`;
        this.description = (error && error.message) ? error.message : "No additional information";
        this.remoteStatusCode = remoteStatusCode || 500;
    }

}
