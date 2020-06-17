# Adopt-A-Pup Frontend React WebApp

The frontend web-app is a React HTML5 application that serves as a UI for backend services.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The entry point is at `src/index.tsx`.

## Prerequisites

Node version >= 12

## Dependency installation

Before starting development, install dependencies with `npm`:

```sh
npm ci
```

## Frontend environment variables

Backend services urls, as well as other configurations are injected into the app as environment variables.
The application automatically reads any environment variables specified in file called `.env`.

To specify these variables. Create the `.env` file as follows:

```sh
REACT_APP_NEWS_ENABLED=1
REACT_APP_ADOPTION_SERVICE_URL=http://localhost:8080
REACT_APP_ANIMAL_SERVICE_URL=http://localhost:8081
REACT_APP_SHELTER_SERVICE_URL=http://localhost:8082
# This variable is used by the server.js backend
BACKEND_NEWS_SERVICE_URL=http://localhost:5000
```

Note that if urls for the backend services are not provided, the web-app will use fake data instead.

In production. The environments can be passed to the container, as specified in the `Dockerfile`.

## Development NPM Scripts

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run start:prod`

Starts the production server by executing `server.js`.

The production server serves the files at `web-app/build`. This is the production build of the web-app.
The production server also injects environment variables at run-time into `web-app/build/index.html` so that they can be read by the web-app.
The injected environment variables must start with the `REACT_APP_` prefix.

### `npm run lint`

Checks and fixes (when possible) coding style errors.
The coding style is specified in the `.eslintrc.json` file.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Container image generation

In a dev environment, you can generate production images for `1.0` and `2.0` version of the application.

To build `1.0`, run `./scripts/build_image_v1`.

To build `2.0`, run `./scripts/build_image_v2`.

If you want to manually push the generated images to quay, run `podman push quay.io/redhattraining/ossm-adopt-a-pup-webapp`.

## Jenkins CI: Automatic container image deployment to Quay.io

This project runs a Jenkins pipeline (see `Jenkinsfile`) for continuous integration and delivery.

In master, the pipeline includes a release step that builds the app bundle, builds the container image and [pushes it to quay](https://quay.io/repository/redhattraining/ossm-adopt-a-pup-webapp) automatically. This step requires manual confirmation. The pipeline waits for confirmation for 5 minutes. The deployment is skipped if not confirmed within that interval. However, you can always rerun the pipeline and confirm the deployment later.

To confirm the deployment, use the master branch pipeline view in Jenkins.

The deployed quay image is [quay.io/redhattraining/ossm-adopt-a-pup-webapp](https://quay.io/repository/redhattraining/ossm-adopt-a-pup-webapp).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
