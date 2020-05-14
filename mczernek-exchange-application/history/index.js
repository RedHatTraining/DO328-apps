'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const _const = require('./lib/constants');
const Jaeger = require('jaeger-client');
const Opentracing = require('opentracing');

const app = express();
const tracer = createTracer();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(function(req, res, next) {
    const context = tracer.extract(Opentracing.FORMAT_HTTP_HEADERS, req.headers);
    const span = tracer.startSpan(`${req.method}:history`, { childOf: context });

    span.setTag(Opentracing.Tags.HTTP_URL, req.url);
    span.setTag(Opentracing.Tags.HTTP_METHOD, req.method);

    function afterResponse() {
        res.removeListener("finish", afterResponse);
        res.removeListener("close", afterResponse);
        span.setTag(Opentracing.Tags.HTTP_STATUS_CODE, res.statusCode);
        span.finish();
    }

    res.on("finish", afterResponse);
    res.on("close", afterResponse);

    next();
});



const postData = (req, res) => {
    const src = req.body.source;
    const target = req.body.target;
    const data = _const[src + "_TO_" + target];

    console.log(`Serving request: ${JSON.stringify(req.body)}`)

    if(!!data === false) {
        res.send(JSON.stringify({state: "Unknown currency conversion"})).status(500);
        return;
    }

    const dataWithDate = [];

    data.forEach( (e, i) => {
        var elementWithDate = {...e}
        var date = new Date();
        date.setDate(date.getDate() - i);
        elementWithDate["date"] = date;
        dataWithDate.push(elementWithDate);
    });

    res.setHeader('Content-Type', 'application/json');
    res.json(dataWithDate).status(200);
}


app.post('/', postData);

app.listen(_const.PORT, () => {
    console.log(
        "  App is running at http://localhost:%d",
        _const.PORT,
    );
    console.log("  Press CTRL-C to stop\n");
});


function createTracer() {
    // Config object is empty as settings are passed as environment variables
    const config = {};
    const options = { logger: console };
    const tracer = Jaeger.initTracerFromEnv(config, options);

    // Use B3 Propagation Specification to be able to read trace headers
    const codec = new Jaeger.ZipkinB3TextMapCodec({ urlEncoding: true });
    tracer.registerInjector(Opentracing.FORMAT_HTTP_HEADERS, codec);
    tracer.registerExtractor(Opentracing.FORMAT_HTTP_HEADERS, codec);

    return tracer;
}
