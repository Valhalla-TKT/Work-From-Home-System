export function sendData(url, method, data) {
    return fetch(url, {
        method: method,
        headers: {
            'Content_Type': 'application/json',
        },

        body: JSON.stringify(data),
        dataType: "json",
    })
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was no ok');
            }
            return response.json();
        });
}

export function getData(url) {
    return fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(response)

            if (response.headers.get('content-length') === '0') {
                return null;
            }

            return response.json();
        });
}
