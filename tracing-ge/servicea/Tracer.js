const Jaeger = require("jaeger-client");
const { FORMAT_HTTP_HEADERS } = require("opentracing");

module.exports = {
    create
};

function create(serviceName, collectorEndpoint, logger) {
    const config = {
       // TODO: setup config for tracer here
    };
    const options = { logger };
    const tracer = Jaeger.initTracer(config, options);  

    // Use B3 Propagation Specification
    // so that Quarkus can interpret the headers
    const codec = new Jaeger.ZipkinB3TextMapCodec({ urlEncoding: true });
    tracer.registerInjector(FORMAT_HTTP_HEADERS, codec);
    tracer.registerExtractor(FORMAT_HTTP_HEADERS, codec);

    return tracer;
}
