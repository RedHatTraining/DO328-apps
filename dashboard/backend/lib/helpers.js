"use strict";

function handleResponse(clientResp, requestError, requestResp) {
    if(requestError) {
        console.log("Got error:", requestError);
        clientResp.json({state: "ERR", isAvailable: false}).status(400);
    } else {
        const respCode = requestResp.statusCode;
        let stateString = "Down";
        let isAvailable = false;

        console.log("No error; got response:", respCode);
        if(respCode >= 200 && respCode < 300) {
            stateString = "OK";
            isAvailable = true;
        }
        clientResp.json({state: stateString, isAvailable: isAvailable}).status(respCode);
        
    }
}

module.exports = {
    handleResponse
};
