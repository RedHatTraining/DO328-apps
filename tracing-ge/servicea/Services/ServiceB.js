const RestClient = require("./RestClient");


module.exports = class ServiceB extends RestClient {

    callServiceB(span) {
        return this.get("/", span);
    }

}