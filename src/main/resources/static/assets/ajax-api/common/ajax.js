async function createUser() {
    var formData = new FormData();
    formData.append('name', $('#username').val());
    formData.append('email', $('#email').val());
    formData.append('password', $('#password').val());
    formData.append('profileImageInput', $('#profile')[0].files[0]);

    try {
        const response = await fetch('/api/user/create', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const responseData = await response.text();
        console.log("Successful:", responseData);
        handleResponse(response, '/vinnet/login');
    } catch (error) {
        console.error('Error:', error);
    }
}
// Division
async function createNewDivision(requestData) {    
    try {
        const responseData = await sendRequest(`/api/division/`, 'POST', requestData);
        handleResponse(responseData, null);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchDivisions() {
    try {
        const responseData = await sendRequest(`/api/division/divisionList`, 'POST', {});
		const jsonData = await responseData.json();
		return jsonData;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function setDivisionCode() {
    try {
        let divisionResponse = await fetchDivisions();
        console.log(divisionResponse);

        if (Array.isArray(divisionResponse) && divisionResponse.length !== 0) {

            document.getElementById("division-code").value = divisionResponse[0].lastCode;
        } else {
            console.log("Division response is empty or not an array");
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function searchDivision(value) {
    try {
		try {
            const responseData = await sendRequestWithOneParam('/api/division/', 'GET', 'divisionId', value);
            const contentType = responseData.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const searchResults = await responseData.json();
                console.log(searchResults)
                return searchResults;
            } else {
                const textData = await responseData.text();
                return textData;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateDivision(requestData) {    
    try {
        const responseData = await sendRequest(`/api/division/`, 'PUT', requestData);
        handleResponse(responseData, null);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteDivision(value) {    
    try {
        const responseData = await sendRequestWithOneParam('/api/division/', 'DELETE', 'id', value);
        handleResponse(responseData, null);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Department
async function createNewDepartment(requestData) {    
    try {
        const responseData = await sendRequest(`/api/department/`, 'POST', requestData);
        handleResponse(responseData, null);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchDepartments() {
    try {
        const responseData = await sendRequest(`/api/department/departmentList`, 'POST', {});
		const jsonData = await responseData.json();
		return jsonData;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function searchDepartment(value) {
    try {
		try {
            const responseData = await sendRequestWithOneParam('/api/department/', 'GET', 'departmentId', value);
            const contentType = responseData.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const searchResults = await responseData.json();
                console.log(searchResults)
                return searchResults;
            } else {
                const textData = await responseData.text();
                return textData;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateDepartment(requestData) {    
    try {
        const responseData = await sendRequest(`/api/department/`, 'PUT', requestData);
        handleResponse(responseData, null);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteDepartment(value) {    
    try {
        const responseData = await sendRequestWithOneParam('/api/department/', 'DELETE', 'id', value);
        handleResponse(responseData, null);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Team
async function createNewTeam(requestData) {    
    try {
        const responseData = await sendRequest(`/api/team/`, 'POST', requestData);
        handleResponse(responseData, null);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchTeams() {
    try {
        const responseData = await sendRequest(`/api/team/teamList`, 'POST', {});
		const jsonData = await responseData.json();
		return jsonData;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function searchTeam(value) {
    try {
		try {
            const responseData = await sendRequestWithOneParam('/api/team/', 'GET', 'teamId', value);
            const contentType = responseData.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const searchResults = await responseData.json();
                console.log(searchResults)
                return searchResults;
            } else {
                const textData = await responseData.text();
                return textData;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateTeam(requestData) {    
    try {
        const responseData = await sendRequest(`/api/team/`, 'PUT', requestData);
        handleResponse(responseData, null);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteTeam(value) {    
    try {
        const responseData = await sendRequestWithOneParam('/api/team/', 'DELETE', 'id', value);
        handleResponse(responseData, null);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function useFetchedPosts() {
    const postsData = await fetchPosts();
    postsData.forEach(post => {
        const user = post.user;
        console.log(user);
    });
}

async function addFriend(requestData) {
    try {
        const {userId, friendId} = requestData;
        const responseData = await sendRequestWithTwoParams('/api/friendship/addFriend', 'POST', 'userId', userId, 'friendId', friendId);
        handleResponse(responseData, null);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function acceptOrRemoveFriend(requestData) {
    try {
        const {friendId, userId, status} = requestData;
        const responseData = await sendRequestWithThreeParams('/api/friendship/acceptOrRemoveFriend', 'POST','friendId', friendId, 'userId', userId, 'status', status);
        handleResponse(responseData, null);
    } catch (error) {
        console.error('Error:', error);
    }
}
