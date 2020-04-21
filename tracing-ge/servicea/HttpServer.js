const Fastify = require("fastify");
const Opentracing = require("opentracing");

module.exports = {
    create
}

function create(logger, tracer) {
    const server = Fastify({ logger });
    server.addHook("onRequest", traceRequest);
    server.addHook("onResponse", traceResponse);
    return server;

    async function traceRequest(request) {
        const { method, originalUrl } = request.raw;
        // TODO: Create a new root span and add opentracing tags
        request.rootSpan = span;
    }

    async function traceResponse(request, reply) {
        request.rootSpan.setTag(Opentracing.Tags.HTTP_STATUS_CODE, reply.res.statusCode);
        request.rootSpan.finish();
    }
}
