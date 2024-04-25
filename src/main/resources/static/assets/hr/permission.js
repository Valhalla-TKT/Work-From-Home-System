$(document).ready(function() {
    getAllUser();
    getAllApproveRole();

    var approveRoleIdList = [];

    $('#permission-user-name-input, .permission-approve-role-name-input').on('input', function() {
        validateInput();
    });

    function validateInput() {
        var username = $('#permission-user-name-input').val().trim();
        var permissionName = $('.permission-approve-role-name-input').val().trim();
        var isUsernameValid = $('#user-name option[value="' + username + '"]').length > 0;
        var isPermissionNameValid = $('.permission-approve-role-name-input').filter(function() {
            return $('#approveRoleSelectBox_' + $(this).data('list')).find('option[value="' + $(this).val() + '"]').length > 0;
        }).length > 0;

        if (username && permissionName && isUsernameValid && isPermissionNameValid) {
            $('#give-permission-to-user').prop('disabled', false);
            $('#no-user-error, .no-permission-approve-role-error').hide();
        } else {
            $('#give-permission-to-user').prop('disabled', true);
            if (!username || !isUsernameValid) {
                $('#no-user-error').text('Staff not found. Please enter the correct staff name.').show();
            } else {
                $('#no-user-error').hide();
            }
            if (!permissionName || !isPermissionNameValid) {
                $('.no-permission-approve-role-error').text('Permission or Approve Role not found. Please enter the correct Permission name.').show();
            } else {
                $('.no-permission-approve-role-error').hide();
            }
        }
    }

    $('#give-permission-to-user').on('click', function() {
        var staffName = $('#permission-user-name-input').val().trim();
        var approveRoleName = $('.permission-approve-role-name-input').val().trim();
        var staffId = $('#user-name option[value="' + staffName + '"]').data('id');
        var approveRoleId = $('.permission-approve-role-name-input').filter(function() {
            return $('#approveRoleSelectBox_' + $(this).data('list')).find('option[value="' + $(this).val() + '"]').length > 0;
        }).data('id');

        console.log('Staff ID:', staffId);
        console.log('Approve Role ID:', approveRoleId);
        updateApproveRole(giveFormDataForPermission(staffId, approveRoleId));
    });

    function giveFormDataForPermission(staffId, approveRoleId) {
        var formData = new FormData();
        formData.append('userId', staffId);
        formData.append('approveRoleId', approveRoleId);
        return formData;
    }

    function updateApproveRole(formData) {
        $.ajax({
            url: 'api/user/updateApproveRole',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log("Successful : ", response);
                $('#message').text(response);
                Swal.fire({
                    title: "Success!",
                    text: "You've updated Successfully!",
                    icon: "success",
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false
                }).then(() => {

                });
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }

    $('#permission-user-name-input').on('input', function() {
        var enteredUsername = $(this).val().trim();
        var found = false;

        $('#user-name option').each(function() {
            if ($(this).val() === enteredUsername) {
                found = true;
                return false;
            }
        });

        if (!found) {
            $('#no-user-error').text('Staff not found. Please enter the correct staff name.').show();
        } else {
            $('#no-user-error').hide();
        }
    });

    $(document).on('input', '.permission-approve-role-name-input', function() {
        var permissionInput = $(this).val().trim();
        var found = false;
        var dataId = null;
        var dataListId = $(this).data('list');

        $('#approveRoleSelectBox_' + dataListId).find('option').each(function() {
            if ($(this).val() === permissionInput) {
                found = true;
                dataId = $(this).data('id');
                return false;
            }
        });

        if (!found) {
            $(this).siblings('.no-permission-approve-role-error').text('Permission or Approve Role not found.').show();
        } else {
            $(this).siblings('.no-permission-approve-role-error').hide();
        }
        console.log('Data ID:', dataId);
    });

    function getAllUser() {
        $.ajax({
            url: 'api/user/userList',
            type: 'POST',
            contentType: 'application/json',
            success: function(response) {
                var selectBox = $('#user-name');
                selectBox.empty();
                selectBox.append('<option value="" disabled selected>Select User Name</option>');
                for (var i = 0; i < response.length; i++) {
                    var option = $('<option>', {
                        value: response[i].name,
                        text: response[i].name,
                        'data-id': response[i].id
                    });
                    selectBox.append(option);
                }
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }

    function getAllApproveRole() {
        $.ajax({
            url: `api/approveRole/approveRoleList`,
            type: 'POST',
            contentType: 'application/json',
            success: function(response) {
				console.log(response.length)
                for (var i = 0; i < response.length; i++) {
                    var dataListId = 'approveRoleSelectBox_' + (i + 1);
                    var dataList = $('<datalist>', {
                        id: dataListId
                    });
                    console.log(dataList)

                    $('#approveRoleSelectBoxContainer').append(dataList);

                    var selectBox = $('#approveRoleSelectBox_' + (i + 1));
                    selectBox.empty();
                    selectBox.append('<option value="" disabled selected>Select Approve Role Name</option>');

                    for (var j = 0; j < response[i].length; j++) {
                        var option = $('<option>', {
                            value: response[i][j].name,
                            text: response[i][j].name,
                            'data-id': response[i][j].id
                        });
                        selectBox.append(option);
                    }
                }
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }

    $(document).on('click', '.add-permission-btn', function() {
        $(this).hide();
        var newPermissionBox = $('<div>', {
            class: 'approve-role-permission-box'
        });

        var inputElement = $('<input>', {
            type: 'text',
           
            class: 'permission-approve-role-name-input',
            list: 'approveRoleSelectBox_' + ($('.permission-approve-role-name-input').length + 1),
            placeholder: 'Enter Permission Name',
            style: 'width: 100%;',
            required: 'required'
        });

        var dataListElement = $('<datalist>', {
            id: 'approveRoleSelectBox_' + ($('.permission-approve-role-name-input').length + 1)
        });

        var errorElement = $('<p>', {
            style: 'color: red;',
            class: 'no-permission-approve-role-error'
        });

        var addPermissionBtn = $('<button>', {
            class: 'btn2 add-permission-btn',
            type: 'button'
        }).text('+');

        newPermissionBox.append(inputElement);
        newPermissionBox.append(dataListElement);
        newPermissionBox.append(errorElement);
        newPermissionBox.append(addPermissionBtn);

        $('.approve-role-permission-container').append(newPermissionBox);
    });
});
