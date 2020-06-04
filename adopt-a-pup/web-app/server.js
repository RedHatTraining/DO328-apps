/*
Code to serve the web app in PRODUCTION.
Injects environment variables at runtime in build/index.html
*/
require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const app = express();

const BUILD_PATH = path.join(__dirname, "build");
const INDEX_FILEPATH = path.join(__dirname, "build", "index.html");


// Setup server (Middlewares are evaluated in order)

app.use(log);

// First, if route is /frontend, we serve index.html with env variables
app.use(async(req, res, next) => {
    if (req.url === "/frontend" || req.url === "/frontend/") {
        sendIndexWithEnv(req, res);
    } else {
        next();
    }
});

// Serve the file if the route is a static file (css, js...)
app.use("/frontend", express.static(BUILD_PATH));

// For the rest of paths we also serve index.html with env variables
app.get("/*", sendIndexWithEnv);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});


function log(req, res, next) {
    console.log(`${(new Date()).toISOString()} - GET ${req.url}`);
    next();
}


async function sendIndexWithEnv(request, response) {
    // Only consider variables starting with REACT_APP
    const environment = {};
    Object.keys(process.env)
        .filter(key => key.startsWith("REACT_APP_"))
        .forEach(key => {
            environment[key] = process.env[key];
        });

    const content = (await fs.readFile(INDEX_FILEPATH))
        .toString()
        .replace(
            "__PRODUCTION_ENV__",
            JSON.stringify(environment)
        );

    response.send(content);
}
