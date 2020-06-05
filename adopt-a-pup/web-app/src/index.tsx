import React from "react";
import ReactDOM from "react-dom";
import "@patternfly/react-core/dist/styles/base.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";


// To simulate a version change, we show some changes in the css.
// One of these two files are loaded based on a build-time env variable.
//
// We use a very basic condition interpretable by the React bundler,
// so that only one of the files is included in the production bundle.
// https://create-react-app.dev/docs/adding-custom-environment-variables/
process.env.REACT_APP_VERSION === "v2" ? require("./v2.css") : require("./v1.css");


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

