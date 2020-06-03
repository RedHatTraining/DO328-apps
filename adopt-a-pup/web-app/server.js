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
    console.log(`${(new Date()).toISOString()} - GET ${req.url}`);

    const indexFilePath = path.join(__dirname, "build", "index.html");
    fs.readFile(indexFilePath, (err, content) => {
        if (err) {
            return res.status(404).send("Not found");
        }

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

console.log(`REACT_APP_ADOPTION_SERVICE_URL: ${process.env.REACT_APP_ADOPTION_SERVICE_URL}`);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
