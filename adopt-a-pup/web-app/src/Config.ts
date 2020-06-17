export default {
    ADOPTION_SERVICE_URL: getEnv("REACT_APP_ADOPTION_SERVICE_URL"),
    ANIMAL_SERVICE_URL: getEnv("REACT_APP_ANIMAL_SERVICE_URL"),
    SHELTER_SERVICE_URL: getEnv("REACT_APP_SHELTER_SERVICE_URL"),
    // If REACT_APP_NEWS_SERVICE_URL is not specified,
    // the app tries to fetch news from the endpoint exposed in "server.js"
    NEWS_SERVICE_URL: getEnv("REACT_APP_NEWS_SERVICE_URL") || "/frontend",
    NEWS_ENABLED: getEnv("REACT_APP_NEWS_ENABLED"),
    getEnv
};

function getEnv(variable: string) {
    // In production, env variables at runtime are read
    // from the global "window" object in the browser
    if (process.env.NODE_ENV === "production") {
        const { env } = window as any;
        return env ? env[variable]: undefined;
    }

    // In dev, the React devserver lets us read variables from Nodejs "process.env"
    return process.env[variable];
}
