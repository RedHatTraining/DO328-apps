/*
Code to serve the web app in PRODUCTION.
Injects environment variables at runtime in build/index.html
*/

const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
    const indexFilePath = path.join(__dirname, "build", "index.html");
    fs.readFile(indexFilePath, (_, content) => {
        const html = content.toString()
            .replace(
                "{{REACT_APP_ADOPTION_SERVICE_URL}}",
                process.env.REACT_APP_ADOPTION_SERVICE_URL || ""
            )
            .replace(
                "{{REACT_APP_ANIMAL_SERVICE_URL}}",
                process.env.REACT_APP_ANIMAL_SERVICE_URL || ""
            )
            .replace(
                "{{REACT_APP_SHELTER_SERVICE_URL}}",
                process.env.REACT_APP_SHELTER_SERVICE_URL || ""
            )
            .replace(
                "{{REACT_APP_NEWS_SERVICE_URL}}",
                process.env.REACT_APP_NEWS_SERVICE_URL || ""
            )
            .replace(
                "{{REACT_APP_NEWS_ENABLED}}",
                process.env.REACT_APP_NEWS_ENABLED || ""
            );

        res.send(html);
    });
});

app.listen(process.env.PORT || 3000);
