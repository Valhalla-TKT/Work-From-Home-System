async function sendRequest(url, method, requestData) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        return response;
    } catch (error) {
        throw new Error('Error sending request: ' + error.message);
    }
}

async function handleResponse(response, redirectUrl = null) {
    if (!response.ok) {
        throw new Error('Request failed');
    }
    if (redirectUrl) {
        window.location.href = redirectUrl;
    }
    const responseData = await response.text();
    console.log("Successful : ", responseData);        
}

async function sendRequestWithOneParam(url, method, paramName, param) {
    try {
        const fullUrl = `${url}?${paramName}=${param}`;

        const response = await fetch(fullUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        return response;
    } catch (error) {
        throw new Error('Error sending request: ' + error.message);
    }
}

async function sendRequestWithTwoParams(url, method, param1Name, param1, param2Name, param2) {
    try {
        const fullUrl = `${url}?${param1Name}=${param1}&${param2Name}=${param2}`;

        const response = await fetch(fullUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        return response;
    } catch (error) {
        throw new Error('Error sending request: ' + error.message);
    }
}

async function sendRequestWithThreeParams(url, method, param1Name, param1, param2Name, param2, param3Name, param3) {
    try {
        const fullUrl = `${url}?${param1Name}=${param1}&${param2Name}=${param2}&${param3Name}=${param3}`;

        const response = await fetch(fullUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        return response;
    } catch (error) {
        throw new Error('Error sending request: ' + error.message);
    }
}