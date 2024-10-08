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
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function setDivisionCode() {
    try {
        let divisionResponse = await fetchDivisions();

        if (Array.isArray(divisionResponse) && divisionResponse.length !== 0) {

            document.getElementById("division-code").value = divisionResponse[0].lastCode;
        } else {
            document.getElementById("division-code").value = divisionResponse;;
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
                return await responseData.json();
            } else {
                return await responseData.text();
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
		const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const jsonData = await responseData.json();
            return jsonData;
        } else {
            const textData = await responseData.text();
            return textData;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchDepartmentsByDivisionId(divisionId) {
    try {
        const responseData = await sendRequestWithOneParam(`/api/department/division/${divisionId}`, 'POST', 'divisionId', divisionId);
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
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
                return await responseData.json();
            } else {
                return await responseData.text();
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
		const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchTeamsByDepartmentId(departmentId) {
    try {
        const responseData = await sendRequestWithOneParam(`/api/team/department/${departmentId}`, 'POST', 'departmentId', departmentId);
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchTeamsByDivisionId(divisionId) {
    try {
        const responseData = await sendRequestWithOneParam(`/api/team/division/${divisionId}`, 'POST', 'divisionId', divisionId);
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
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
                return await responseData.json();
            } else {
                return await responseData.text();
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

// User
async function createNewUser(requestData) {    
    try {
        const responseData = await sendRequest(`/api/user/`, 'POST', requestData);
        handleResponse(responseData, null);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchUsers() {
    try {
        const responseData = await sendRequest(`/api/user/userList`, 'POST', {});        
		const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            const textData = await responseData.text();
            return textData;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function searchUser(value) {
    try {
		try {
            const responseData = await sendRequestWithOneParam('/api/user/', 'GET', 'teamId', value);
            const contentType = responseData.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await responseData.json();
            } else {
                return await responseData.text();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateUser(requestData) {    
    try {
        const responseData = await sendRequest(`/api/user/`, 'PUT', requestData);
        handleResponse(responseData, null);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteUser(value) {    
    try {
        const responseData = await sendRequestWithOneParam('/api/user/', 'DELETE', 'id', value);
        handleResponse(responseData, null);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchUsersByTeamId(teamId) {
    try {
        const responseData = await sendRequestWithOneParam(`/api/user/getAllUserByTeamId`, 'POST', 'teamId', teamId);
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchUsersByDepartmentId(departmentId) {
    try {
        const responseData = await sendRequestWithOneParam(`/api/user/getAllUserByDepartmentId`, 'POST', 'departmentId', departmentId);
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchUsersByDivisionId(divisionId) {
    try {
        const responseData = await sendRequestWithOneParam(`/api/user/division/${divisionId}`, 'POST', 'divisionId', divisionId);
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchUsersByGender(gender) {
    try {
        const responseData = await sendRequestWithOneParam(`/api/user/gender`, 'POST', 'gender', gender);
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchUsersByTeamIdAndGender(teamId ,gender) {
    try {
        const responseData = await sendRequestWithoutParam(`/api/user/team/${teamId}/gender/${gender}`, 'POST');
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchUsersByDepartmentIdAndGender(departmentId ,gender) {
    try {
        const responseData = await sendRequestWithoutParam(`/api/user/department/${departmentId}/gender/${gender}`, 'POST');
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchUsersByDivisionIdAndGender(divisionId ,gender) {
    try {
        const responseData = await sendRequestWithoutParam(`/api/user/division/${divisionId}/gender/${gender}`, 'POST');
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchUserFormHistory(userId) {
    try {
        const responseData = await sendRequestWithoutParam(`/api/registerform/users/${userId}/form-history`, 'GET');
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await responseData.json();
            return data.formHistory;
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// async function getSessionUser() {
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: '${getContextPath()}/wfhs/api/session/user',
//             type: 'POST',
//             contentType: 'application/json',
//             success: function(response) {
//                 console.log(response);
//                 localStorage.setItem('currentUser', JSON.stringify(response));
//                 resolve(response);
//             },
//             error: function (error) {
//                 console.error('Error:', error);
//                 reject(null);
//             }
//         });
//     });
// }

async function getSessionUser() {
    try {
        const response = await sendRequest('/api/session/user', 'POST', {});
        const responseData = await response.json();
        localStorage.setItem('currentUser', JSON.stringify(responseData));
        return responseData;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}


async function createCeoForm(userId, fromDate, toDate) {
    try {
        const responseData = await sendRequestWithThreeParams(`/api/registerform/createCeoForm`, 'POST', 'userId', userId, "from_date", fromDate, "to_date", toDate);
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Cookie JWT
async function fetchCookie(url) {
    const token = getCookie("JWT");
    if (!token) {
        console.error("No JWT token found");
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Apply Form Page

async function fetchTeamMemberByUserId(teamId, userId) {
    try {
        const responseData = await sendRequestWithTwoParams(`/api/user/getAllTeamMember`, 'POST', "teamId", teamId, "userId", userId);
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchDepartmentMemberByUserId(departmentId, userId) {
    try {
        const responseData = await sendRequestWithTwoParams(`/api/user/getAllDepartmentMember`, 'POST', "departmentId", departmentId, "userId", userId);
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchApprovers() {
    try {
        const responseData = await sendRequest(`/api/user/getAllApprover`, 'POST', {});
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchApproversByApproveRoleId(approveRoleId) {
    try {
        const responseData = await sendRequestWithOneParam(`/api/user/getApproversByApproveRoleId`, 'POST', "approveRoleId", approveRoleId);
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchAllApproveRole() {
    try {
        const responseData = await sendRequest(`/api/approveRole/approveRoleList`, 'POST', {});
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchApproveRoleWithoutApplicant() {
    try {
        const responseData = await sendRequest(`/api/approveRole/approveRoleListWithoutApplicant`, 'POST', {});
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchTeamWithStatus(status, teamId, userId) {
    try {
        const responseData = await sendRequestWithThreeParams("/api/registerform/getTeamWithStatus", "POST", "status", status, "teamId", teamId, "userId", userId)
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateApproverStatus(id, state, approveDate, reason) {
    try {
        const responseData = await sendRequestWithFourParams(`/api/workflowstatus/updateApproverStatus`, 'POST', 'id', id, "state", state, "approveDate", approveDate, "reason", reason);
        const contentType = responseData.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await responseData.json();
        } else {
            return await responseData.text();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// fetchData('/api/protected-endpoint');