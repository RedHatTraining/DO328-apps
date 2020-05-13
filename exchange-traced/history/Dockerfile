FROM ubi8/nodejs-12

ENV JAEGER_SERVICE_NAME=history \
    JAEGER_SAMPLER_TYPE=const \
    JAEGER_SAMPLER_PARAM=1 \
    JAEGER_REPORTER_LOG_SPANS=true \
    JAEGER_ENDPOINT=http://jaeger-collector.istio-system.svc:14268/api/traces

COPY package.json .

RUN npm install

COPY lib ./lib
COPY index.js .

CMD node index.js
