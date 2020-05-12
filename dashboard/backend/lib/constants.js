"use strict";

const PORT = process.env.PORT || 8080;
const TARGET_PROJECT = process.env.TARGET_PROJECT || "secure-mesh";
// History service
const HISTORY_SERVICE = process.env.HISTORY_SERVICE || "history";
const HISTORY_SERVICE_PORT = process.env.HISTORY_SERVICE_PORT || "8080";
// Main endpoint
const HISTORY_FQDN = `http://${HISTORY_SERVICE}.${TARGET_PROJECT}.svc.cluster.local:${HISTORY_SERVICE_PORT}`;

// Currency service
const CURRENCY_SERVICE = process.env.CURRENCY_SERVICE || "currency";
const CURRENCY_SERVICE_PORT = process.env.CURRENCY_SERVICE_PORT || "5000";
// Main endpoint 
const CURRENCY_FQDN = `http://${CURRENCY_SERVICE}.${TARGET_PROJECT}.svc.cluster.local:${CURRENCY_SERVICE_PORT}`;

// Gateway service
const EXCHANGE_SERVICE = process.env.EXCHANGE_SERVICE || "exchange";
const EXCHANGE_SERVICE_PORT = process.env.EXCHANGE_SERVICE_PORT || "8080";
// Ping endpoint
const EXCHANGE_FQDN = `http://${EXCHANGE_SERVICE}.${TARGET_PROJECT}.svc.cluster.local:${EXCHANGE_SERVICE_PORT}`;

// Frontend service
const FRONTEND_SERVICE = process.env.FRONTEND_SERVICE || "frontend";
const FRONTEND_SERVICE_PORT = process.env.FRONTEND_SERVICE_PORT || "3000";
// Main endpoint
const FRONTEND_FQDN = `http://${FRONTEND_SERVICE}.${TARGET_PROJECT}.svc.cluster.local:${FRONTEND_SERVICE_PORT}/frontend`;


const HISTORY_DATA = {
    source: "USD",
    target: "EUR"
};

module.exports = {
    PORT,
    HISTORY_DATA,
    HISTORY_FQDN,
    CURRENCY_FQDN,
    EXCHANGE_FQDN,
    FRONTEND_FQDN
};
