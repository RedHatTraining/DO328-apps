const Axios = require("axios");
const { Tags, FORMAT_HTTP_HEADERS } = require("opentracing");


module.exports = class RestClient {

    constructor(baseURL, tracer) {
        this.baseURL = baseURL;
        this.axios = Axios.create({ baseURL });
        this.tracer = tracer;
    }

    async get(url, rootSpan) {
        const spanName = `servicea:${this.constructor.name}.get`;
        // TODO: Create a new span and and add tags

        try {
            const response = await this.axios.get(url, this._buildAxiosRequestConfig(span));
            return response.data;
        } catch (error) {
            span.setTag(Tags.ERROR, error);
        } finally {
            span.finish();
        }
    }

    _buildAxiosRequestConfig(span) {
        const headers = {};
        // TODO: Inject span as HTTP headers to propagate span context
        return { headers };
    }

}

