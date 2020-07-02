async function fetchWithRetry (url, options=null, retries=3, msTimeout=3000) {
    const timerPromise = createTimerPromise(msTimeout)
    try {
        const response = await Promise.race([fetch(url, options), timerPromise]);
        if (!isValid(response)) {
            throw new Error(`Received invalid response with status ${response.status}.`);
        }
        return response;
    } catch(err) {
        if (retries === 1) throw err;
        console.log(`Retrying due to: ${err}`)
        return await fetchWithRetry(url, options, retries - 1);
    }
};

function createTimerPromise(timeout) {
    return new Promise((_, reject) => {
        setTimeout(()=> {
            reject(new Error('Request Timeout'))
        }, timeout)
    })
}

function isValid(response) {
    return response.status >= 200 && response.status < 300;
}

module.exports = {
    fetchWithRetry
};
