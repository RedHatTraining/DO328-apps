/*
Code to serve the web app in PRODUCTION.
Injects environment variables at runtime in build/index.html
*/
require("dotenv").config();
const express = require("express");
const path = require("path");
const Axios = require("axios").default;
const fs = require("fs").promises;


const PORT = process.env.PORT || 8080;
const BUILD_PATH = path.join(__dirname, "build");
const INDEX_FILEPATH = path.join(__dirname, "build", "index.html");
const newsAxios =  Axios.create({ baseURL: process.env.BACKEND_NEWS_SERVICE_URL });
const app = express();


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

// News service AJAX endpoint
app.get("/frontend/news/puppies", async(req, res) => {
    try {
        const { data } = await newsAxios.get("/news/puppies");
        res.send(data);
    } catch (error) {
        console.error(error);
        const status = error.response ? error.response.status : 500;
        res.status(status).send(error.message || "Unknown error while calling news service");
    }
});

// For the rest of paths we also serve index.html with env variables
app.get("/*", sendIndexWithEnv);


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
