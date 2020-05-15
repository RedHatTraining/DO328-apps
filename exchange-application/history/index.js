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


app.post('/', postData);

app.listen(_const.PORT, () => {
    console.log(
        "  App is running at http://localhost:%d",
        _const.PORT,
    );
    console.log("  Press CTRL-C to stop\n");
});
