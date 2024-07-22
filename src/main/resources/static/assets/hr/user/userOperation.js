$(document).ready( function(){
    let approveRoles = [];
    let filteredUserData = [];
    var currentPage = 1;
    var usersPerPage = 10;
    var totalUsers = 0;
    var userData = [];

    const pagination = document.querySelector('.pagination');
    const pageNumbers = pagination.querySelector('.page-numbers');
     getAllUser(1, true);
    toggleSections();
    $('#join-date').dateDropper({
        format: 'd-m-Y',
    });
    getAllTeam(), getAllDepartment(), getAllDivision(), getAllApproveRole()
    $('#team-filter').on('change', async function() {
        await getAllUser(1);
    });
    $('#department-filter').on('change', async function() {
        await updateTeamsByDepartment();
        await getAllUser(1);
    });
    $('#division-filter').on('change', async function() {
        await updateDepartmentsByDivision();
        await updateTeamsByDivision();
        await getAllUser(1);
    });
    $('#gender-filter').on('change', async function() {
        await getAllUser(1)
    });

    $('#search-by-staff-name').on('input', function() {
        const searchTerm = $(this).val().trim().toLowerCase();
        searchUsers(searchTerm);
    });

    function searchUsers(term) {
        if (!term) {
            filteredUserData = userData;
        } else {
            const lowerTerm = term.toLowerCase();
            filteredUserData = userData.filter(user => {
                const name = user.name.toLowerCase();
                const email = user.email.toLowerCase();
                const staffId = user.staffId.toLowerCase();

                // Check if any of the user's roles match the search term
                const roleMatch = user.approveRoles.some(role => role.name.toLowerCase().includes(lowerTerm));

                return name.includes(lowerTerm) || email.includes(lowerTerm) || staffId.includes(lowerTerm) || roleMatch;
            });
        }
        totalUsers = filteredUserData.length;
        currentPage = 1;
        renderUsers();
    }



    $('#gender').change(function() {
        var selectedGender = $(this).val();
        //generateStaffId(selectedGender);
    });

    $('#create-staff').click(function(event) {
        event.preventDefault();
        createUser();
    });
    function toggleSections(approverOption) {
        if (approverOption === 'PROJECT_MANAGER' || approverOption === 'APPLICANT') {
            $('#team-data').show();
            $('#department-data').hide();
            $('#division-data').hide();
        } else if (approverOption === 'DEPARTMENT_HEAD') {
            $('#team-data').hide();
            $('#department-data').show();
            $('#division-data').hide();
        } else if (approverOption === 'DIVISION_HEAD') {
            $('#team-data').hide();
            $('#department-data').hide();
            $('#division-data').show();
        } else {
            $('#team-data').hide();
            $('#department-data').hide();
            $('#division-data').hide();
        }
    }

    $('#approveRoleSelectBox').change(function() {
        var selectedOption = $(this).find('option:selected').text();
        toggleSections(selectedOption);
    });
    function createUser(){
        var staff_id = $('#staff-id').val();
        var name = $('#name').val();
        var email = $('#email').val();
        var phone_number = $('#phone-number').val();
        var gender = $('#gender').val();
        var parent =$('input[name="parent"]:checked').val();
        var children =$('input[name="children"]:checked').val();
        var marital_status =$('input[name="marital_status"]:checked').val();
        var join_date = $('#join-date').val();
        var formattedJoinDate = moment(join_date, 'DD-MM-YYYY').format('YYYY-MM-DD');
        var role = $('#role-name').val();
        var position = $('#position-name').val();
        var team = $('#team-name').val();
        var approver = $('#approveRoleSelectBox').val();
        var  department = $("#department-name").val();
        var division= $("#division-name").val();
        var requestData = {
            staff_id : staff_id,
            name : name,
            email : email,
            phone_number : phone_number,
            gender : gender,
            marital_status : marital_status,
            parent : parent,
            children : children,
            join_date : formattedJoinDate,
            roleId : role,
            positionId : position,
            teamId : team,
            approveRoleId : approver,
            departmentId : department,
            divisionId : division
        };

        $.ajax({
            url: `api/user/create`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            dataType: 'text',
            success: function(response) {
                $('#message').text(response);
                $('#add-data-overlay').hide();
                getAllUser();
                $('#staff-id').val('');
                $('#name').val('');
                $('#email').val('');
                $('#gender').val('');
                $('#role-name').val('');
                $('#position-name').val('');
                $('#team-name').val('');
                $('#approveRoleSelectBox').val('');
                $('#department-name').val('');
                $('#division-name').val('');
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }

    // function generateStaffId(gender) {
    //     var requestData = {
    //         gender:gender
    //     };
    //     $.ajax({
    //         url: `${getContextPath()}/api/user/generateStaffId`,
    //         type: 'POST',
    //         contentType: 'application/json',
    //         data: JSON.stringify(requestData),
    //         dataType: 'text',
    //         success: function (response) {
    //             var textBox = $('#staff-id');
    //             textBox.empty();
    //             textBox.val(response);
    //         },
    //         error: function (xhr, status, error) {
    //             console.error('Error:', error);
    //             console.error('Status:', status);
    //             console.error('Response Text:', error.responseText)
    //             console.error('XHR:', xhr);
    //         }
    //
    //     });
    // }

    async function getAllTeam() {
        await fetchTeams()
            .then(response => {
                var selectBox = $('#team-name');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select Team Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                    });
                    selectBox.append(option);
                }
                var selectBox = $('#team-filter');
                selectBox.empty();
                selectBox.append('<option value="all" selected>Filter by Team</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                    });
                    selectBox.append(option);
                }
                var selectBoxDetail = $('#team-name-detail');
                selectBoxDetail.empty();
                selectBoxDetail.append('<option value="all" selected>Select Team Name</option>');
                for (var d = 0; d < response.length; d++) {
                    var optionDetail = $('<option>', {
                        value: response[d].id,
                        text: response[d].name,
                    });
                    selectBoxDetail.append(optionDetail);
                }

            })
            .catch(error => {
                console.error('Error:', error);
            })
    }

    async function updateTeamsByDepartment() {
        try {
            var departmentId = $('#department-filter').val();
            var divisionId = $('#division-filter').val();
            var teams = [];

            if (departmentId !== 'all') {
                teams = await getTeamsByDepartmentId(departmentId);
            } else if (divisionId !== 'all') {
                teams = await getTeamsByDivisionId(divisionId);
            }
            else {
                teams = await fetchTeams();
            }

            var selectBox = $('#team-filter');
            selectBox.empty();
            selectBox.append('<option value="all" selected>Filter by Team</option>');

            teams.forEach(team => {
                var option = $('<option>', {
                    value: team.id,
                    text: team.name,
                });
                selectBox.append(option);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function getAllDepartment() {
        await fetchDepartments()
            .then(response => {
                var selectBox = $('#department-name');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select Department Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                    });
                    selectBox.append(option);
                }
                var selectBox = $('#department-filter');
                selectBox.empty();
                selectBox.append('<option value="all" selected>Filter by Department</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                    });
                    selectBox.append(option);
                }
                var selectBox = $('#department-name-detail');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select Department Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                    });
                    selectBox.append(option);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }

    async function updateDepartmentsByDivision() {
        try {
            var divisionId = $('#division-filter').val();
            var departments = [];

            if (divisionId !== 'all') {
                departments = await getDepartmentsByDivisionId(divisionId);
            } else {
                departments = await fetchDepartments();
            }

            var selectBox = $('#department-filter');
            selectBox.empty();
            selectBox.append('<option value="all" selected>Filter by Department</option>');

            departments.forEach(department => {
                var option = $('<option>', {
                    value: department.id,
                    text: department.name,
                });
                selectBox.append(option);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function updateTeamsByDivision() {
        try {
            var divisionId = $('#division-filter').val();
            var teams = [];

            if (divisionId !== 'all') {
                teams = await getTeamsByDivisionId(divisionId);
            } else {
                teams = await fetchTeams();
            }

            var selectBox = $('#team-filter');
            selectBox.empty();
            selectBox.append('<option value="all" selected>Filter by Team</option>');

            teams.forEach(team => {
                var option = $('<option>', {
                    value: team.id,
                    text: team.name,
                });
                selectBox.append(option);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function getAllDivision() {
        await fetchDivisions()
            .then(response => {
                var selectBox = $('#division-name');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Choose Division Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                    });
                    selectBox.append(option);
                }
                var selectBox = $('#division-filter');
                selectBox.empty();
                selectBox.append('<option value="all" selected>Filter by Division</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                    });
                    selectBox.append(option);
                }
                var selectBox = $('#division-name-detail');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Choose Division Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                    });
                    selectBox.append(option);
                }
                /*var selectBox = $('#division-name-detail-2');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Choose Division Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                    });
                    selectBox.append(option);
                }*/
                var checkboxContainer = $('#division-name-detail-2');
	            checkboxContainer.empty();
	            response.forEach(division => {
	                var checkbox = $('<input>', {
	                    type: 'checkbox',
	                    value: division.id,
	                    id: 'division-' + division.id,
	                });
	                var label = $('<label>', {
	                    for: 'division-' + division.id,
	                    text: division.name,
	                });
	                checkboxContainer.append(checkbox);
	                checkboxContainer.append(label);
	                checkboxContainer.append('<br>');
	            });
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }

    /*function renderUsers() {
        const start = (currentPage - 1) * usersPerPage;
        const end = start + usersPerPage;
        const pageData = filteredUserData.slice(start, end);

        $('#staff-list').empty();
        pageData.forEach(user => {
            $('#staff-list').append(`
            <a href="detail" class="js-resume-card resume-card designer-search-card resume-card-sections-hidden js-user-row-6234" data-user='${JSON.stringify(user)}'>
                <div class="resume-card-header resume-section-padding">
                    <div class="resume-card-header-designer">
                        <img class="resume-card-avatar" alt="${user.name}" width="70" height="70"
                            src="${getContextPath()}/assets/profile/${user.profile}" />                               
                        <div class="resume-card-header-details">
                            <div class="resume-card-title">
                                <h3 class="resume-card-designer-name user-select-none">
                                    ${user.name}
                                </h3>
                                <span class="badge badge-pro">${user.staffId}</span>
                            </div>
                            <span class="resume-card-header-text">
                                <p>
                                    <span class="resume-card-location">${user.teamName}</span>
                                    <span class="resume-card-middot">.</span>
                                    <span class="resume-card-location">${user.divisionName}</span>
                                </p>
                            </span>
                        </div>
                    </div>
                </div>
            </a>
        `);
        });
        addCardEventListeners();
        updatePagination();
    }*/
    
    function renderUsers() {
	    const start = (currentPage - 1) * usersPerPage;
	    const end = start + usersPerPage;
	    const pageData = filteredUserData.slice(start, end);
	
	    $('#staff-list').empty();
	    pageData.forEach(user => {
	        $('#staff-list').append(`
	            <tr>
	                <td>${user.name}</td>
	                <td>${user.staffId}</td>
	                <td>${user.divisionName}</td>
	                <td>${user.departmentName}</td>
	                <td>${user.teamName}</td>
	                <td><i class="fa-solid fa-pen-to-square edit-user cursor-pointer text-blue" data-user='${JSON.stringify(user)}'></i><span style="margin-left: 15px;"></span> | <span style="margin-right: 15px;"></span><i class="fa-solid fa-trash cursor-pointer text-red"></i></td>                
	            </tr>
	        `);
	    });
	    updatePagination();
	    addCardEventListeners();
	}


    function updatePagination() {
        pageNumbers.innerHTML = '';
        const totalPages = Math.ceil(totalUsers / usersPerPage);

        if (totalPages <= 1) return;

        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        if (currentPage > 1) {
            addPageLink('prev', 'Previous');
        }

        if (startPage > 1) {
            addPageLink(1, '1');
            if (startPage > 2) {
                addEllipsis();
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            addPageLink(i, i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                addEllipsis();
            }
            addPageLink(totalPages, totalPages);
        }

        if (currentPage < totalPages) {
            addPageLink('next', 'Next');
        }
    }

    function addPageLink(page, text) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = text;
        pageLink.classList.add('page-link');
        if (page === 'prev') {
            pageLink.dataset.page = currentPage - 1;
        } else if (page === 'next') {
            pageLink.dataset.page = currentPage + 1;
        } else {
            pageLink.dataset.page = page;
            if (page === currentPage) {
                pageLink.classList.add('active');
            }
        }
        pageNumbers.appendChild(pageLink);
    }

    function addEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        ellipsis.classList.add('ellipsis');
        pageNumbers.appendChild(ellipsis);
    }

    pagination.addEventListener('click', function (event) {
        if (event.target.classList.contains('page-link')) {
            event.preventDefault();
            const page = parseInt(event.target.dataset.page);
            if (!isNaN(page)) {
                currentPage = page;
                renderUsers();
            }
        }
    });

    async function getAllUser() {
        var selectedTeamId = $('#team-filter').val();
        var selectedDepartmentId = $('#department-filter').val();
        var selectedDivisionId = $('#division-filter').val();
        var selectedGender = $('#gender-filter').val();
        const totalCount = $('#total-count');
        let response;
        try {
            if (selectedGender === "all") {
                if (selectedTeamId && selectedTeamId !== "all") {
                    response = await getUsersByTeamId(selectedTeamId);
                } else if (selectedDepartmentId && selectedDepartmentId !== "all") {
                    response = await getUsersByDepartmentId(selectedDepartmentId);
                } else if (selectedDivisionId && selectedDivisionId !== "all") {
                    response = await getUsersByDivisionId(selectedDivisionId);
                } else {
                    response = await fetchUsers();
                }
            } else {
                if (selectedTeamId && selectedTeamId !== "all") {
                    response = await getUsersByTeamIdAndGender(selectedTeamId, selectedGender);
                } else if (selectedDepartmentId && selectedDepartmentId !== "all") {
                    response = await getUsersByDepartmentIdAndGender(selectedDepartmentId, selectedGender);
                } else if (selectedDivisionId && selectedDivisionId !== "all") {
                    response = await getUsersByDivisionIdAndGender(selectedDivisionId, selectedGender);
                } else {
                    response = await getUsersByGender(selectedGender);
                }
            }

            userData = response;
            filteredUserData = userData;
            totalUsers = userData.length;
            totalCount.text(totalUsers)
            currentPage = 1;
            renderUsers();
        } catch (error) {
            console.error('Error in getAllUser:', error);
        }
    }


    function showDetailModal(user) {
        document.getElementById('staff-id-detail').value = user.staffId;
        document.getElementById('name-detail').value = user.name;
        document.getElementById('email-detail').value = user.email;
        document.getElementById('gender-detail').value = user.gender;
        document.getElementById('position-name-detail').value = user.positionName;
        document.getElementById('user-id-detail').value = user.id;
        let userRole = ''
            user.approveRoles.forEach(role => {
                userRole = role.name;
            });
        const approveRoleSelectBoxDetail = document.getElementById('approveRoleSelectBoxDetail');
        approveRoleSelectBoxDetail.innerHTML = '';
        approveRoles.forEach(role => {
            let option = document.createElement('option');
            option.value = role.id;
            option.text = role.name;
            if (role.name === userRole) {
                option.selected = true;
            }
            approveRoleSelectBoxDetail.appendChild(option);
        });
        $('#team-name-detail').val(user.teamId).change();
        $('#department-name-detail').val(user.departmentId).change();
        $('#division-name-detail').val(user.divisionId).change();
        document.getElementById('detail-data-overlay').style.display = 'block';
        
        // for permission change
        document.getElementById('name-detail-2').value = user.name;
        $('#division-name-detail-2').val(user.divisionId).change();
    }

    $('#approveRoleSelectBoxDetail').change(function() {
        var selectedOption = $(this).find('option:selected').text();
        toggleSections(selectedOption);
    });

    $('#update-approve-role').click(function(event) {
        event.preventDefault();
        var userId = $('#user-id-detail').val();
        var approveRoleIdList = $('#approveRoleSelectBoxDetail').val();
        $.ajax({
            url: `${getContextPath()}/api/user/updateApproveRole`,
            type: 'POST',
            data: {
                userId: userId,
                approveRoleId: approveRoleIdList
            },
            success: function(response) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Role updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('#message').text(response);

                        const updatedRoles = $('#approveRoleSelectBoxDetail option:selected').map(function() {
                            return {
                                id: $(this).val(),
                                name: $(this).text()
                            };
                        }).get();

                        updateUserRoleInList(userId, updatedRoles);
                    }
                });
            },
            error: function(error) {
                console.error('Error:', error);
                $('#message').text('Update User Role Failed...');
            }
        });
    });

    function updateUserRoleInList(userId, updatedRoles) {
        userData.forEach(user => {
            if (user.id === parseInt(userId)) {
                user.approveRoles = updatedRoles;
            }
        });

        renderUsers();
    }

    function addCardEventListeners() {
        const cards = document.querySelectorAll('.edit-user');
        cards.forEach(card => {
            card.addEventListener('click', function (event) {
                event.preventDefault();
                const user = JSON.parse(card.getAttribute('data-user'));
                showDetailModal(user);
            });
        });
    }

    document.querySelectorAll('.close-edit-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            document.getElementById('detail-data-overlay').style.display = 'none';
            document.getElementById('role-change-overlay').style.display = 'none';
        });
    });

	document.getElementById('change-role').addEventListener('click', () => {
		document.getElementById('detail-data-overlay').style.display = 'none';
        document.getElementById('role-change-overlay').style.display = 'block';
    });

    document.getElementById('close-role-modal').addEventListener('click', () => {
        document.getElementById('role-change-overlay').style.display = 'none';
        document.getElementById('detail-data-overlay').style.display = 'block';
    });

    document.getElementById('update-approve-role').addEventListener('click', () => {
        // Add your logic to save role changes here
        document.getElementById('role-change-overlay').style.display = 'none';
        document.getElementById('detail-data-overlay').style.display = 'block';
    });


    $('#load-more').on('click', async function() {
        currentPage++;
        await getAllUser(currentPage, true);
    });
    function getAllApproveRole() {
        $.ajax({
            url: `${getContextPath()}/api/approveRole/approveRoleList`,
            type: 'POST',
            contentType: 'application/json',
            success: function (response) {
                approveRoles = response;
                var selectBox = $('#approveRoleSelectBox');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select Approve Role Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                    });
                    selectBox.append(option);
                }
                var selectBoxDetail = $('#approveRoleSelectBoxDetail');
                selectBoxDetail.empty();
                selectBoxDetail.append('<option value="" disabled selected>Select Approve Role Name</option>');
                for (var j = 0; j < response.length; j++) {
                    var optionJ = $('<option>', {
                        value: response[j].id,
                        text: response[j].name,
                    });
                    selectBoxDetail.append(optionJ);
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }
    async function getUsersByTeamId(teamId) {
        return await fetchUsersByTeamId(teamId)
    }
    async function getUsersByDepartmentId(departmentId) {
        return await fetchUsersByDepartmentId(departmentId)
    }
    async function getUsersByDivisionId(divisionId) {
        return await fetchUsersByDivisionId(divisionId)
    }
    async function getUsersByGender(gender) {
        return await fetchUsersByGender(gender)
    }
    async function getUsersByTeamIdAndGender(teamId, gender) {
        return await fetchUsersByTeamIdAndGender(teamId, gender)
    }
    async function getUsersByDepartmentIdAndGender(departmentId, gender) {
        return await fetchUsersByDepartmentIdAndGender(departmentId, gender)
    }
    async function getUsersByDivisionIdAndGender(divisionId, gender) {
        return await fetchUsersByDivisionIdAndGender(divisionId, gender)
    }
    async function getTeamsByDepartmentId(departmentId) {
        return await fetchTeamsByDepartmentId(departmentId)
    }
    async function getDepartmentsByDivisionId(divisionId) {
        return await fetchDepartmentsByDivisionId(divisionId)
    }
    async function getTeamsByDivisionId(divisionId) {
        return await fetchTeamsByDivisionId(divisionId)
    }
})