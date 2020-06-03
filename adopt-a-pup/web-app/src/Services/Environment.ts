export default {

    get(variable: any): any {
        // In production, env variables at runtime are read
        // from the global "window" object
        if (process.env.NODE_ENV === "production") {
            return (window as any).env[variable];
        }

        // In dev, we let the react dev server inject this
        return process.env[variable];
    }

};
