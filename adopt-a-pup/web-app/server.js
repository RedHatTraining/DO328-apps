/*
Code to serve the web app in PRODUCTION.
Injects environment variables at runtime in build/index.html
*/
const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const app = express();

const indexFilePath = path.join(__dirname, "build", "index.html");
console.log(`Using: ${indexFilePath}`);

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", async(req, res) => {
    console.log(`${(new Date()).toISOString()} - GET ${req.url}`);
    let content;
    content = await render(indexFilePath, {
        REACT_APP_ADOPTION_SERVICE_URL: process.env.REACT_APP_ADOPTION_SERVICE_URL,
        REACT_APP_ANIMAL_SERVICE_URL: process.env.REACT_APP_ANIMAL_SERVICE_URL,
        REACT_APP_SHELTER_SERVICE_URL: process.env.REACT_APP_SHELTER_SERVICE_URL,
        REACT_APP_NEWS_SERVICE_URL: process.env.REACT_APP_NEWS_SERVICE_URL,
        REACT_APP_NEWS_ENABLED: ["true", "1", "True"].includes(
            process.env.REACT_APP_NEWS_ENABLED
        )
    });

    res.send(content);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});


async function render(filePath, data) {
    console.log(data);
    const content = await fs.readFile(filePath);
    return content
        .toString()
        .replace(
            "__PRODUCTION_ENV__",
            JSON.stringify(data)
        );
}
