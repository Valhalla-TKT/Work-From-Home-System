function getContextPath() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(segment => segment.length > 0);
    return segments.length > 0 ? `/${segments[0]}` : '/';
}

async function sendRequest(url, method, requestData) {
    try {
        const contextPath = getContextPath();
        const fullUrl = `${contextPath}${url}`;

        const response = await fetch(fullUrl, {
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
        const contextPath = getContextPath();
        const fullUrl = `${contextPath}${url}?${paramName}=${param}`;

        const response = await fetch(fullUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Unauthorized request');
            } else {
                throw new Error('Request failed');
            }
        }

        return response;
    } catch (error) {
        throw new Error('Error sending request: ' + error.message);
    }
}

async function sendRequestWithTwoParams(url, method, param1Name, param1, param2Name, param2) {
    try {
        const contextPath = getContextPath();
        const fullUrl = `${contextPath}${url}?${param1Name}=${param1}&${param2Name}=${param2}`;

        const response = await fetch(fullUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'Request failed');
        }

        return response;
    } catch (error) {
        throw new Error('Error sending request: ' + error.message);
    }
}

async function sendRequestWithThreeParams(url, method, param1Name, param1, param2Name, param2, param3Name, param3) {
    try {
        const contextPath = getContextPath();
        const fullUrl = `${contextPath}${url}?${param1Name}=${param1}&${param2Name}=${param2}&${param3Name}=${param3}`;

        const response = await fetch(fullUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'Request failed');
        }

        return response;
    } catch (error) {
        throw new Error('Error sending request: ' + error.message);
    }
}

async function sendRequestWithoutParam(url, method) {
    try {
        const contextPath = getContextPath();
        const fullUrl = `${contextPath}${url}`;

        const response = await fetch(fullUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'Request failed');
        }

        return response;
    } catch (error) {
        throw new Error('Error sending request: ' + error.message);
    }
}


