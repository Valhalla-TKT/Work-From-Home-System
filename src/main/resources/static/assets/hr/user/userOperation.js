$(document).ready( function(){
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

    $('#gender').change(function() {
        var selectedGender = $(this).val();
        generateStaffId(selectedGender);
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

    function generateStaffId(gender) {
        var requestData = {
            gender:gender
        };
        $.ajax({
            url: `http://localhost:8080/api/user/generateStaffId`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            dataType: 'text',
            success: function (response) {
                var textBox = $('#staff-id');
                textBox.empty();
                textBox.val(response);
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                console.error('Status:', status);
                console.error('Response Text:', error.responseText)
                console.error('XHR:', xhr);
            }

        });
    }

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
                selectBox.append('<option value="all" selected>Select Team Name</option>');
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
            selectBox.append('<option value="all" selected>Select Team Name</option>');

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
                selectBox.append('<option value="all" selected>Select Department Name</option>');
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
            selectBox.append('<option value="all" selected>Select Department Name</option>');

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
            selectBox.append('<option value="all" selected>Select Team Name</option>');

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
                selectBox.append('<option value="" disabled selected>Select Division Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                    });
                    selectBox.append(option);
                }
                var selectBox = $('#division-filter');
                selectBox.empty();
                selectBox.append('<option value="all" selected>Select Division Name</option>');
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

    function getAllPosition() {
        $.ajax({
            url: `http://localhost:8080/api/position/positionList`,
            type: 'POST',
            contentType: 'application/json',
            success: function (response) {
                var selectBox = $('#position-name');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select Position Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                    });
                    selectBox.append(option);
                }
                var selectBox = $('#position-filter');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select Position Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                    });
                    selectBox.append(option);
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }

    var currentPage = 1;
    var usersPerPage = 10;

    function renderLoadMoreButton(totalCount, currentCount) {
        console.log("totalCount = ", totalCount, ", currentCount = ", currentCount)
        if (currentCount < totalCount) {
            $('#load-more').show();
        } else {
            $('#load-more').hide();
        }
    }

    async function getAllUser(page = 1, appendData = false) {
        var selectedTeamId = $('#team-filter').val();
        var selectedDepartmentId = $('#department-filter').val();
        var selectedDivisionId = $('#division-filter').val();
        var selectedGender = $('#gender-filter').val();
        let response;

        // Clear staff list based on filter
        if (!appendData) {
            $('#staff-list').empty();
        }

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

            var totalUsers = response.length;
            var start = (page - 1) * usersPerPage;
            var end = start + usersPerPage;
            var usersToShow = response.slice(start, end);

            console.log(usersToShow)
            usersToShow.forEach(user => {
                // if (selectedGender && selectedGender !== "all" && user.gender !== selectedGender) {
                //     return; // Skip this user if gender doesn't match the filter
                // }

                // Append user to staff list
                $('#staff-list').append(`
                <a href="detail" class="js-resume-card resume-card designer-search-card resume-card-sections-hidden js-user-row-6234" data-user='${JSON.stringify(user)}'>
                    <div class="resume-card-header resume-section-padding">
                        <div class="resume-card-header-designer">
                            <img class="resume-card-avatar" alt="${user.name}" width="70" height="70"
                                src="/assets/profile/${user.profile}" />                               
                            <div class="resume-card-header-details">
                                <div class="resume-card-title">
                                    <h3 class="resume-card-designer-name user-select-none">
                                        ${user.name}
                                    </h3>
                                    <span class="badge badge-pro">${user.staffId}</span>
                                </div>
                                <span class="resume-card-header-text">
                                    <p>
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

            console.log("hi")
            renderLoadMoreButton(totalUsers, $('#staff-list').children().length);
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
        document.getElementById('approveRoleSelectBoxDetail').value = user.permission;
        document.getElementById('team-name-detail').value = user.teamName;
        document.getElementById('department-name-detail').value = user.departmentName;
        document.getElementById('division-name-detail').value = user.divisionName;
        document.getElementById('detail-data-overlay').style.display = 'block';
    }

    function addCardEventListeners() {
        const cards = document.querySelectorAll('.js-resume-card');
        cards.forEach(card => {
            card.addEventListener('click', function (event) {
                event.preventDefault();
                const user = JSON.parse(card.getAttribute('data-user'));
                showDetailModal(user);
            });
        });
    }

    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            document.getElementById('detail-data-overlay').style.display = 'none';
        });
    });



    $('#load-more').on('click', async function() {
        currentPage++;
        await getAllUser(currentPage, true);
    });
    function getAllApproveRole() {
        $.ajax({
            url: `http://localhost:8080/api/approveRole/approveRoleList`,
            type: 'POST',
            contentType: 'application/json',
            success: function (response) {
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