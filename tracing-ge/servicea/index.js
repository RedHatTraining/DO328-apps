const Dotenv = require('dotenv');
const Pino = require("pino");
const HttpServer = require("./HttpServer");
const Tracer = require("./Tracer");
const ServiceB = require("./Services/ServiceB");
const logger = Pino();

// Load variables from .env file
Dotenv.config();
const TRACE_COLLECTOR_URL = process.env.TRACE_COLLECTOR_URL || "TODO: add jaeger collector URL";
const SERVICEB_URL = process.env.SERVICEB_URL || "http://serviceb:8080";

const tracer = Tracer.create("servicea", TRACE_COLLECTOR_URL, logger);
const serviceb = new ServiceB(SERVICEB_URL, tracer);

const server = HttpServer.create(logger, tracer);

server.get("/", async (request) => {
    const { rootSpan } = request;
    const msg = await serviceb.callServiceB(rootSpan);

    return 'Hello from ServiceA!.\nResponse from ServiceB => ' + msg + '\n';
});

server.listen(8080, "0.0.0.0");
