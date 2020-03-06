'use strict';

//const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const _const = require('./lib/constants');

const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

/* MOCK for other microservice */
const getData = (req, res) => {
    const currencies = ["EUR", "USD"]
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(currencies).status(200);
};


/* MOCK for other microservice
 */
const getCurrencyData = (req, resp) => {
    const currency = req.params.currency;
    var res = {value: ""}
    if(currency === "EUR") {
        res.value = 1.11
        res.srcSign = "€"
        res.targetSign = "$"
    } else {
        res.value = 0.9
        res.srcSign = "$"
        res.targetSign = "€"
    }
    resp.json(res).status(200);
}


app.post('/', postData);
app.get('/', getData);
app.get('/:currency', getCurrencyData)


app.listen(_const.PORT, () => {
    console.log(
        "  App is running at http://localhost:%d",
        _const.PORT,
    );
    console.log("  Press CTRL-C to stop\n");
});
