"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const _const = require("./lib/constants");
const _helper = require("./lib/helpers");
const request = require("request");

const app = express();

app.use(bodyParser.json());

app.use(function(_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const checkHistory = (req, resp) => {
    request.post(_const.HISTORY_FQDN, {json: _const.HISTORY_DATA, timeout: 1500}, (error, res) => {
        _helper.handleResponse(resp, error, res);
    });
};

const checkCurrency = (req, resp) => {
    request.get(_const.CURRENCY_FQDN, {timeout: 1500}, (error, res) => {
        _helper.handleResponse(resp, error, res);
    });
};

const checkExchangeGateway = (req, resp) => {
    request.get(_const.EXCHANGE_FQDN, {timeout: 1500}, (error, res) => {
        _helper.handleResponse(resp, error, res);
    });
};

const checkFrontEnd = (req, resp) => {
    request.get(_const.FRONTEND_FQDN, {timeout: 1500}, (error, res) => {
        _helper.handleResponse(resp, error, res);
    });
};

app.get("/history", checkHistory);
app.get("/currencies", checkCurrency);
app.get("/exchangeGW", checkExchangeGateway);
app.get("/frontend", checkFrontEnd);

app.listen(_const.PORT, () => {
    console.log(
        "  App is running at http://localhost:%d",
        _const.PORT,
    );
    console.log("  Press CTRL-C to stop\n");
});
