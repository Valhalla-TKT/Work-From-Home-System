$(document).ready(function(){
    getAllUser();
    toggleSections();
    $('#join-date').dateDropper({
        format: 'd-m-Y',
    });
    getAllTeam(), getAllRole(), getAllDepartment(), getAllDivision(), getAllApproveRole()
    $('#team-filter').on('change', getAllUser);
    $('#department-filter').on('change', getAllUser);
    $('#division-filter').on('change', getAllUser);
    $('#gender-filter').on('change', getAllUser);

    if('#gender') {
        console.log('#gender')
    }
    $('#gender').change(function() {
        var selectedGender = $(this).val();
        console.log(selectedGender)
        console.log(selectedGender)
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
        console.log("In function : " , gender)
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
                console.log('Response:', response);
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

    function getAllTeam() {
        $.ajax({
            url: `http://localhost:8080/api/team/teamList`,
            type: 'POST',
            contentType: 'application/json',
            success: function (response) {
                var selectBox = $('#team-name');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select Team Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                        'data-code': response[i].code
                    });
                    selectBox.append(option);
                }
                var selectBox = $('#team-filter');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select Team Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                        'data-code': response[i].code
                    });
                    selectBox.append(option);
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }
    function getAllDepartment() {
        $.ajax({
            url: `http://localhost:8080/api/department/departmentList`,
            type: 'POST',
            contentType: 'application/json',
            success: function (response) {var selectBox = $('#department-name');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select Department Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                        'data-code': response[i].code
                    });
                    selectBox.append(option);
                }
                var selectBox = $('#department-filter');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select Department Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                        'data-code': response[i].code
                    });
                    selectBox.append(option);
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }
    function getAllDivision() {
        $.ajax({
            url: `http://localhost:8080/api/division/divisionList`,
            type: 'POST',
            contentType: 'application/json',
            success: function (response) {
                var selectBox = $('#division-name');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select Division Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                        'data-code': response[i].code
                    });
                    selectBox.append(option);
                }
                var selectBox = $('#division-filter');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select Division Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                        'data-code': response[i].code
                    });
                    selectBox.append(option);
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }
    function getAllRole() {
        $.ajax({
            url: `http://localhost:8080/api/role/roleList`,
            type: 'POST',
            contentType: 'application/json',
            success: function (response) {
                var selectBox = $('#role-name');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select Role Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                        'data-code': response[i].code
                    });
                    selectBox.append(option);
                }
                var selectBox = $('#role-filter');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select Role Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].id,
                        text: response[i].name,
                        'data-code': response[i].code
                    });
                    selectBox.append(option);
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
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
                        'data-code': response[i].code
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
                        'data-code': response[i].code
                    });
                    selectBox.append(option);
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }

    async function getAllUser() {
        $('#staff-list').empty();
        var rowCount = 0;
        var selectedTeamId = $('#team-filter').val();
        var selectedDepartmentId = $('#department-filter').val();
        var selectedDivisionId = $('#division-filter').val();
        var selectedGender = $('#gender-filter').val();
        console.log(selectedGender)
        let response;
        if (selectedTeamId) {
            response = await getUsersByTeamId(selectedTeamId);
        } else if (selectedDepartmentId) {
            response = await getUsersByDepartmentId(selectedDepartmentId);
        } else if (selectedDivisionId) {
            //response = await getUsersByDivisionId(selectedDivisionId); // assuming this function exists
        } else {
            response = await fetchUsers();
        }

        if (response === null || response === undefined) {
            console.log("User is null.");
        } else if (Array.isArray(response)) {
            if (response.length === 0) {
                console.log("Response List length is 0.");
            } else {
                response.forEach(function (user){
                    // if (selectedGender && selectedGender !== "all" && user.gender !== selectedGender) {
                    //     return;
                    // }
                    rowCount++;
                    if(user.gender === "M") {
                        user.gender = "Male"
                    } else {
                        user.gender = "Female"
                    }
                    $('#staff-list').append(`
                      <a href="detail"
                                        class="js-resume-card resume-card  designer-search-card resume-card-sections-hidden  js-user-row-6234">
                        <div class="resume-card-header resume-section-padding  ">
                          <div class="resume-card-header-designer">
                            <img class="resume-card-avatar" alt="Halo UI/UX" width="62" height="62"
                              src="/assets/icons/DAT Logo.png" />
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
            }
            console.log("row count =", rowCount);
            document.getElementById("total-count").innerText = rowCount;
        }

    }
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
                        'data-code': response[i].code
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
        return await fetehUsersByTeamId(teamId)
    }
    async function getUsersByDepartmentId(departmentId) {
        return await fetehUsersByDepartmentId(departmentId)
    }
})