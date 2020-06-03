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

app.use(express.static(BUILD_PATH));

// Return index.html, with injected env variables
const indexFilePath = path.join(__dirname, "build", "index.html");
app.get("/*", async(request, response) => {
    const content = await injectEnvironmentInHTml(indexFilePath);
    response.send(content);
    log(request);
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});


function log(req) {
    console.log(`${(new Date()).toISOString()} - GET ${req.url}`);
}


async function injectEnvironmentInHTml(filePath) {
    // Only consider variables starting with REACT_APP
    const environment = {};
    Object.keys(process.env)
        .filter(key => key.startsWith("REACT_APP_"))
        .forEach(key => {
            environment[key] = process.env[key];
        });

    const content = await fs.readFile(filePath);
    return content
        .toString()
        .replace(
            "__PRODUCTION_ENV__",
            JSON.stringify(environment)
        );
}
