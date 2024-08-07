$(document).ready(function () {
    var urlParams = window.location;
    const url = new URL(urlParams);
    const path = url.pathname.split('/')
    var formId = path[path.length - 3]
    var userId = path[path.length - 1]
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var approveRoles = currentUser.approveRoles;
    var userRole;
    approveRoles.forEach(function (approveRole) {
        userRole = approveRole.name;
    });
    // data send to backend
    var workFlowStatusId, approverId, registerFormId, state, reason, approveDate, newApproverId;
    const pmReasonInputBox = $('#pm-reason');
    const deptHeadReasonInputBox = $('#dept-head-reason');
    const divisionHeadReasonInputBox = $('#division-head-reason');
    const cisoReasonInputBox = $('#ciso-reason');
    const finalApprovalReasonInputBox = $('#final-approval-reason');
    const serviceDeskReasonInputBox = $('#service-desk-reason');
    const pmApproveDateInputBox = $('#pm-approve-date');
    const deptHeadApproveDateInputBox = $('#dept-head-approve-date');
    const divisionHeadApproveDateInputBox = $('#division-head-approve-date');
    const cisoApproveDateInputBox = $('#ciso-approve-date');
    const finalApprovalApproveDateInputBox = $('#final-approval-approve-date');

    pmApproveDateInputBox.dateDropper({
        format: 'd-m-Y',
    });
    /*var approve_date;*/
    pmApproveDateInputBox.on('change', function () {
        var chosenDate = $(this).val();
        if (chosenDate) {

            var parts = chosenDate.split('-');
            if (parts.length === 3) {
                var formattedDate = parts[1] + '-' + parts[0] + '-' + parts[2];
                var formattedApproveDate = new Date(formattedDate);


                if (!isNaN(formattedApproveDate.getTime())) {
                    approveDate = formattedApproveDate.toISOString().split('T')[0];
                } else {
                }
            } else {
                console.error("Invalid date format:", chosenDate);
            }
        } else {
            console.error("Date value is empty");
        }
    });

    pmApproveDateInputBox.on('blur', function () {
        $(this).removeAttr('readonly');
    });

    //deptHead
    deptHeadApproveDateInputBox.dateDropper({
        format: 'd-m-Y',
    });
    /*var approve_date;*/
    deptHeadApproveDateInputBox.on('change', function () {
        var chosenDate = $(this).val();
        if (chosenDate) {

            var parts = chosenDate.split('-');
            if (parts.length === 3) {
                var formattedDate = parts[1] + '-' + parts[0] + '-' + parts[2];
                var formattedApproveDate = new Date(formattedDate);


                if (!isNaN(formattedApproveDate.getTime())) {
                    approveDate = formattedApproveDate.toISOString().split('T')[0];
                    console.log("Formatted approve date:", formattedApproveDate);
                } else {
                    console.error("Invalid date value:", formattedDate);
                }
            } else {
                console.error("Invalid date format:", chosenDate);
            }
        } else {
            console.error("Date value is empty");
        }
    });

    deptHeadApproveDateInputBox.on('blur', function () {
        $(this).removeAttr('readonly');
    });
    //divisionHead
    divisionHeadApproveDateInputBox.dateDropper({
        format: 'd-m-Y',
    });
    divisionHeadApproveDateInputBox.on('change', function () {
        var chosenDate = $(this).val();
        if (chosenDate) {

            var parts = chosenDate.split('-');
            if (parts.length === 3) {
                var formattedDate = parts[1] + '-' + parts[0] + '-' + parts[2];
                var formattedApproveDate = new Date(formattedDate);


                if (!isNaN(formattedApproveDate.getTime())) {
                    approveDate = formattedApproveDate.toISOString().split('T')[0];
                } else {
                    console.error("Invalid date value:", formattedDate);
                }
            } else {
                console.error("Invalid date format:", chosenDate);
            }
        } else {
            console.error("Date value is empty");
        }
    });

    divisionHeadApproveDateInputBox.on('blur', function () {
        $(this).removeAttr('readonly');
    });
    // ciso
    cisoApproveDateInputBox.dateDropper({
        format: 'd-m-Y',
    });
    cisoApproveDateInputBox.on('change', function () {
        var chosenDate = $(this).val();
        if (chosenDate) {

            var parts = chosenDate.split('-');
            if (parts.length === 3) {
                var formattedDate = parts[1] + '-' + parts[0] + '-' + parts[2];
                var formattedApproveDate = new Date(formattedDate);


                if (!isNaN(formattedApproveDate.getTime())) {
                    approveDate = formattedApproveDate.toISOString().split('T')[0];
                } else {
                    console.error("Invalid date value:", formattedDate);
                }
            } else {
                console.error("Invalid date format:", chosenDate);
            }
        } else {
            console.error("Date value is empty");
        }
    });

    cisoApproveDateInputBox.on('blur', function () {
        $(this).removeAttr('readonly');
    });
    // final
    finalApprovalApproveDateInputBox.dateDropper({
        format: 'd-m-Y',
    });
    finalApprovalApproveDateInputBox.on('change', function () {
        var chosenDate = $(this).val();
        if (chosenDate) {

            var parts = chosenDate.split('-');
            if (parts.length === 3) {
                var formattedDate = parts[1] + '-' + parts[0] + '-' + parts[2];
                var formattedApproveDate = new Date(formattedDate);


                if (!isNaN(formattedApproveDate.getTime())) {
                    approveDate = formattedApproveDate.toISOString().split('T')[0];
                } else {
                    console.error("Invalid date value:", formattedDate);
                }
            } else {
                console.error("Invalid date format:", chosenDate);
            }
        } else {
            console.error("Date value is empty");
        }
    });

    finalApprovalApproveDateInputBox.on('blur', function () {
        $(this).removeAttr('readonly');
    });
    //
    var flowStatusId;
    getFormDetailsById(formId, userId);

    function getFormDetailsById(formId, userId) {
        $.ajax({
            url: `${getContextPath()}/api/registerform/getFormById?formId=${formId}&userId=${userId}`,
            type: 'POST',
            contentType: 'application/json',
            success: function (response) {
                var formStatus = response.formStatus;
                var registerForm = response.registerForm;
                var capture = response.capture;
                var applicant = response.applicant;
                var requester = response.requester;
                var workFlowStatuses = response.workFlowStatus;

                if (requester.id !== applicant.id) {
                    $('#self-request-radio-output').prop('checked', false);
                    $('#other-request-radio-output').prop('checked', true);
                } else {
                    $('#self-request-radio-output').prop('checked', true);
                    $('#other-request-radio-output').prop('checked', false);
                }
                flowStatusId = formStatus.id;
                $('#name-display-by-form-id').val(applicant.name);
                $('#position-display-by-form-id').val(applicant.positionName);
                $('#team-display-by-form-id').val(applicant.team.name);
                $('#department-display-by-form-id').val(applicant.department.name);
                $('#working-place-display-by-form-id').val(registerForm.workingPlace);
                var requestPercent = registerForm.requestPercent;
                updateStaffIdFieldsForDetailPage(applicant.staffId);
                $('input[type="radio"][value="' + requestPercent + '"]').prop('checked', true);
                $('input[type="radio"][value="' + capture.os_type + '"]').prop('checked', true);
                $('#from-date-display-by-form-id').val(formatDate(registerForm.fromDate))
                $('#to-date-display-by-form-id').val(formatDate(registerForm.toDate));
                const requestReasonDisplayByFormId = $('.ProseMirror.request-reason-display-by-form-id')[0];
                requestReasonDisplayByFormId.innerText = registerForm.requestReason;
                if (capture.os_type === 'Window') {
                    $('#window').show();
                    $('#mac').hide();
                    $('#linux').hide();
                    var captureOSImageDataUrl = 'data:image/png;base64,' + capture.operationSystem;
                    $('#window-operating-system-display-by-form-id').attr("src", captureOSImageDataUrl);
                    var captureSPImageDataUrl = 'data:image/jpeg;base64,' + capture.securityPatch;
                    $('#window-securityPatch-display-by-form-id').attr("src", captureSPImageDataUrl);
                    var captureASImageDataUrl = 'data:image/jpeg;base64,' + capture.antivirusSoftware;
                    $('#window-antivirusSoftware-display-by-form-id').attr("src", captureASImageDataUrl);
                    var captureAPImageDataUrl = 'data:image/jpeg;base64,' + capture.antivirusPattern;
                    $('#window-antivirusPattern-display-by-form-id').attr("src", captureAPImageDataUrl);
                    var captureFSImageDataUrl = 'data:image/jpeg;base64,' + capture.antivirusFullScan;
                    $('#window-antivirusFullScan-display-by-form-id').attr("src", captureFSImageDataUrl);
                } else if (capture.os_type === 'Mac') {
                    $('#window').hide();
                    $('#mac').show();
                    $('#linux').hide();
                    var captureOSImageDataUrl = 'data:image/jpeg;base64,' + capture.operationSystem;
                    $('#mac-operating-system-display-by-form-id').attr("src", captureOSImageDataUrl);
                    var captureSPImageDataUrl = 'data:image/jpeg;base64,' + capture.securityPatch;
                    $('#mac-securityPatch-display-by-form-id').attr("src", captureSPImageDataUrl);
                    var captureASImageDataUrl = 'data:image/jpeg;base64,' + capture.antivirusSoftware;
                    $('#mac-antivirusSoftware-display-by-form-id').attr("src", captureASImageDataUrl);
                } else if (capture.os_type === 'Linux') {
                    $('#window').hide();
                    $('#mac').hide();
                    $('#linux').show();
                    var captureOSImageDataUrl = 'data:image/jpeg;base64,' + capture.operationSystem;
                    $('#linux-operating-system-display-by-form-id').attr("src", captureOSImageDataUrl);
                    var captureSPImageDataUrl = 'data:image/jpeg;base64,' + capture.securityPatch;
                    $('#linux-securityPatch-display-by-form-id').attr("src", captureSPImageDataUrl);
                    var captureASImageDataUrl = 'data:image/jpeg;base64,' + capture.antivirusSoftware;
                    $('#linux-antivirusSoftware-display-by-form-id').attr("src", captureASImageDataUrl);
                }
                $('#signed-date-display-by-form-id').val(formatDate(registerForm.signedDate));
                var signatureImageDataUrl = 'data:image/jpeg;base64,' + registerForm.signature;
                $('#signature-display-by-form-id').attr("src", signatureImageDataUrl);
                $('#approval-sections-container').empty();

                var formAlreadyProcessed = workFlowStatuses.some(function(status) {
                    var approverId = parseInt(status.approverId, 10);
                    var userIdInt = parseInt(userId, 10);
                    return (status.status.toLowerCase() === 'approve' || status.status.toLowerCase() === 'reject') &&
                        approverId === userIdInt;
                });

                if (formAlreadyProcessed) {
                    $('.button-container#approve-reject-button-container').html('<div class="margin-l-8 form-sub" id="go-home-btn" onclick="window.location.href=\'' + getContextPath() + '/admin/viewFormList\';">Go Back</div>');
                } else {
                    $('.button-container#approve-reject-button-container').html(`
                    <div id="reject-form-btn" class="margin-l-8 form-sub" style="background: transparent; color: red; border: 2px solid red;">Reject</div>
                    <div class="margin-l-8 form-sub" id="approve-form-btn">Approve</div>                    
                `);
                    var approveBtn = $('#approve-form-btn');
                    approveBtn.click(function(event) {

                        if (!approveDate || approveDate.trim() === "") {
                            Swal.fire({
                                title: 'Input Required',
                                text: 'Please provide an approve date.',
                                icon: 'warning',
                                confirmButtonText: 'OK'
                            });
                            return;
                        }

                        workFlowStatusId = flowStatusId
                        approverId = currentUser.id
                        registerFormId = formId
                        state = true;
                        if (userRole === 'PROJECT_MANAGER') {
                            reason = pmReasonInputBox.val();
                        }
                        if (userRole === 'DEPARTMENT_HEAD') {
                            reason = deptHeadReasonInputBox.val();
                        }
                        if (userRole === 'DIVISION_HEAD') {
                            reason = divisionHeadReasonInputBox.val();
                        }
                        if (userRole === 'CISO') {
                            reason = cisoReasonInputBox.val();
                        }
                        if (userRole === 'CEO') {
                            reason = finalApprovalReasonInputBox.val();
                        }
                        if (userRole === 'SERVICE_DESK') {
                            reason = serviceDeskReasonInputBox.val();
                        }

                        if (!reason || reason.trim() === "") {
                            Swal.fire({
                                title: 'Input Required',
                                text: 'Please provide a reason for your approval/rejection.',
                                icon: 'warning',
                                confirmButtonText: 'OK'
                            });
                            return;
                        }

                        event.preventDefault();
                        var requestData = {
                            workFlowStatusId: workFlowStatusId,
                            approverId: approverId,
                            registerFormId: registerFormId,
                            state: state,
                            reason: reason,
                            approveDate: approveDate,
                        };


                        var formData = new FormData();

                        formData.append('workFlowStatusId', parseInt(workFlowStatusId));
                        formData.append('approverId', parseInt(approverId));
                        formData.append('registerFormId', parseInt(registerFormId));
                        formData.append('state', state);
                        formData.append('reason', reason);
                        formData.append('approveDate', approveDate);
                        formData.append('workFlowStatusDto', JSON.stringify(requestData));
                        approveForm(formData).then(r => "");

                    });
                }

                workFlowStatuses.forEach(function(status) {
                    if (status.status.toLowerCase() !== 'pending') {
                        var approvalSectionHtml = `
                            <section data-v-741dde45="" data-v-115a39aa="" id="${status.approveRole.name.toLowerCase()}-approval-output-section"
                                    class="user-form-container-2 user-form display-flex">
                                <div class="pledge-container">
                                    <div class="pledge-heading">
                                        <h2>${status.approveRole.name} Approval <span style="font-size: 18px;">(${status.approverName})</span></h2>
                                    </div>
                                </div>
                                <div class="final-form">
                                    <div class="display-flex approval-final">
                                        <span>Approve Status :</span>
                                        <div class="final-display-input" id="${status.approveRole.name.toLowerCase()}-approval-status">
                                            <div class="display-flex w-50">
                                                <div class="display-data">
                                                    <input class="radio-button__input" style="background-color: black; border-color: transparent; transform: scale(0.8); box-shadow: 0 0 20px #0d0c22;" type="radio" name="${status.approveRole.name.toLowerCase()}-approval" value="yes" ${status.state ? 'checked' : ''} disabled>
                                                </div>
                                                <div class="display-data" style="margin-right: 10px;">Approve</div>
                                            </div>
                                            <div class="display-flex w-50">
                                                <div class="display-data">
                                                    <input class="radio-button__input" style="border: 1px solid black; background: #fff;" type="radio" name="${status.approveRole.name.toLowerCase()}-approval" value="no" ${!status.state ? 'checked' : ''} disabled>
                                                </div>
                                                <div class="display-data" style="margin-right: 10px;">Reject</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="display-flex approval-final">
                                        <span>Approved Date :</span>
                                        <div class="display-flex final-display-input">
                                            <input type="text" value="${status.approveDate ? formatDate(status.approveDate) : ''}" style="color: #0d0c22; background: #fff; border: 1px solid black;" disabled>
                                        </div>
                                    </div>
                                    <div class="display-flex approval-final">
                                        <span>Reason of Approval :</span>
                                        <div class="display-flex final-display-input">
                                            <textarea type="text" style="color: #0d0c22; background: #fff; border: 1px solid black;" disabled>${status.reason}</textarea>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        `;
                        $('#approval-sections-container').append(approvalSectionHtml);
                        if (formAlreadyProcessed) {
                            $(`#${status.approveRole.name.toLowerCase()}-approval-input-section`).hide();
                        }
                    }
                });



                // var projectManagerApprovalSection = $('#project-manager-approval-output-section')
                // var departmentHeadApprovalSection = $('#department-head-approval-output-section')
                // var divisionHeadApprovalSection = $('#division-head-approval-output-section')
                // var cisoHeadApprovalSection = $('#ciso-approval-output-section')
                // var ceoHeadApprovalSection = $('#ceo-approval-output-section')

                // if (projectManagerApprovalSection.length) {
                //     if (workFlowStatuses[0].status === 'APPROVE') {
                //         $('#pm-approval-status input[value="yes"]').prop('checked', true);
                //         $('#pm-approval-status input[value="no"]').prop('checked', false);
                //     }
                //     if (workFlowStatuses[0].status === 'REJECT') {
                //         $('#pm-approval-status input[value="yes"]').prop('checked', false);
                //         $('#pm-approval-status input[value="no"]').prop('checked', true);
                //     }
                //     var pmApproveDate = formatDate(workFlowStatuses[0].approve_date);
                //     $('#project-manager-approval-approve-date-output').val(pmApproveDate)
                //     $('#project-manager-approval-approve-reason-output').val(workFlowStatuses[0].reason)
                // }
                // // for department head
                // if (departmentHeadApprovalSection.length && workFlowStatuses.length > 1) {
                //     if (workFlowStatuses[1].status === 'APPROVE') {
                //         $('#dept-head-approval-status input[value="yes"]').prop('checked', true);
                //         $('#dept-head-approval-status input[value="no"]').prop('checked', false);
                //     }
                //     if (workFlowStatuses[1].status === 'REJECT') {
                //         $('#dept-head-approval-status input[value="yes"]').prop('checked', false);
                //         $('#dept-head-approval-status input[value="no"]').prop('checked', true);
                //     }
                //     var deptHeadApproveDate = formatDate(workFlowStatuses[1].approve_date);
                //     $('#department-head-approval-approve-date-output').val(deptHeadApproveDate)
                //     $('#department-head-approval-approve-reason-output').val(workFlowStatuses[1].reason)
                // }
                // // for division head
                // if (divisionHeadApprovalSection.length && workFlowStatuses.length > 2) {
                //     if (workFlowStatuses[2].status === 'APPROVE') {
                //         $('#division-head-approval-status input[value="yes"]').prop('checked', true);
                //         $('#division-head-approval-status input[value="no"]').prop('checked', false);
                //     }
                //     if (workFlowStatuses[2].status === 'REJECT') {
                //         $('#division-head-approval-status input[value="yes"]').prop('checked', false);
                //         $('#division-head-approval-status input[value="no"]').prop('checked', true);
                //     }
                //     var divisionHeadApproveDate = formatDate(workFlowStatuses[2].approve_date);
                //     $('#division-head-approval-approve-date-output').val(divisionHeadApproveDate)
                //     $('#division-head-approval-approve-reason-output').val(workFlowStatuses[2].reason)
                // }
                // // for ciso
                // if (cisoHeadApprovalSection.length && workFlowStatuses.length > 3) {
                //     if (workFlowStatuses[3].status === 'APPROVE') {
                //         $('#ciso-approval-status input[value="yes"]').prop('checked', true);
                //         $('#ciso-approval-status input[value="no"]').prop('checked', false);
                //     }
                //     if (workFlowStatuses[3].status === 'REJECT') {
                //
                //         $('#ciso-approval-status input[value="yes"]').prop('checked', false);
                //         $('#ciso-approval-status input[value="no"]').prop('checked', true);
                //     }
                //     var cisoApproveDate = formatDate(workFlowStatuses[3].approve_date);
                //     $('#ciso-approval-approve-date-output').val(cisoApproveDate)
                //     $('#ciso-approval-approve-reason-output').val(workFlowStatuses[3].reason)
                // }
                // // for ceo
                // if (ceoHeadApprovalSection.length && workFlowStatuses.length > 4) {
                //     if (workFlowStatuses[4].status === 'APPROVE') {
                //         $('#ceo-approval-status input[value="yes"]').prop('checked', true);
                //         $('#ceo-approval-status input[value="no"]').prop('checked', false);
                //     }
                //     if (workFlowStatuses[4].status === 'REJECT') {
                //
                //         $('#ceo-approval-status input[value="yes"]').prop('checked', false);
                //         $('#ceo-approval-status input[value="no"]').prop('checked', true);
                //     }
                //     var divisionHeadApproveDate = formatDate(workFlowStatuses[4].approve_date);
                //     $('#ceo-approval-approve-date-output').val(divisionHeadApproveDate)
                //     $('#ceo-approval-approve-reason-output').val(workFlowStatuses[4].reason)
                // }
            },
            error: function (error) {
                console.error('Error fetching division data:', error);
            }
        });
    }

    $('#continue-button').click(function(event) {
        event.preventDefault();

        showNextDiv();
    });

    $('#continue-button-1').click(function(event) {
        event.preventDefault();
        showNextDiv1();
    });

    $('#go-back').click(function(event) {
        showPreviousDiv();
    });

    $('#go-back-1').click(function(event) {
        showPreviousDiv1();
    });
    function showNextDiv() {
        window.scrollTo(0, 0);
        $("#data-section").hide();
        $("#capture-section").show();
        $("#signature-section").hide();
        $("#go-back").show();
        $("#go-back-1").hide();

        $("#current-step-1").hide();
        $("#current-step-2").show();
        $("#current-step-3").hide();
    }

    function showNextDiv1() {
        window.scrollTo(0, 0);
        $("#data-section").hide();
        $("#capture-section").hide();
        $("#signature-section").show();
        $("#go-back").hide();
        $("#go-back-1").show();

        $("#current-step-1").hide();
        $("#current-step-2").hide();
        $("#current-step-3").show();
    }

    function showPreviousDiv() {
        window.scrollTo(0, 0);
        $("#data-section").show();
        $("#capture-section").hide();
        $("#signature-section").hide();
        $("#go-back").hide();
        $("#go-back-1").hide();

        $("#current-step-1").show();
        $("#current-step-2").hide();
        $("#current-step-3").hide();
    }

    function showPreviousDiv1() {
        window.scrollTo(0, 0);
        $("#data-section").hide();
        $("#capture-section").show();
        $("#signature-section").hide();
        $("#go-back").show();
        $("#go-back-1").hide();

        $("#current-step-1").hide();
        $("#current-step-2").show();
        $("#current-step-3").hide();
    }

    function formatDate(dateString) {
        var approveDate = new Date(dateString);
        var day = approveDate.getDate();
        var month = approveDate.getMonth() + 1;
        var year = approveDate.getFullYear();

        // Pad day and month with leading zeros if necessary
        day = (day < 10) ? '0' + day : day;
        month = (month < 10) ? '0' + month : month;

        // Construct the formatted date string
        var formattedDate = day + '-' + month + '-' + year;

        return formattedDate;
    }

    function updateStaffIdFieldsForDetailPage(staffId) {

        const charArray = staffId.split('');

        const staffIdInputs = $('#staff-id-output-container input');

        staffIdInputs.each(function (index) {
            $(this).val(charArray[index]);
        });
    }

    async function approveForm(formData) {
        await Swal.fire({
            title: 'Choose Approver Name',
            html: `<select id="approver-name" class="select" style="width: 100%; color: #0d0c22; border: 1px solid black;">
                   <option selected disabled>Choose Approver Name</option>
               </select>`,
            didOpen: async () => {
                await getAllApprover();
            },
            preConfirm: () => {
                const approverName = Swal.getPopup().querySelector('#approver-name').value;
                if (!approverName) {
                    Swal.showValidationMessage(`Please choose an approver`);
                }
                return approverName;
            },
            showCancelButton: true,
            confirmButtonText: 'Select',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const approverName = result.value;
                newApproverId = result.value;
                formData.append('newApproverId', newApproverId);

                Swal.fire({
                    title: 'Are you sure?',
                    text: `You selected ${approverName}. Do you want to proceed?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, proceed',
                    cancelButtonText: 'No, change selection'
                }).then((confirmResult) => {
                    if (confirmResult.isConfirmed) {
                        $.ajax({
                            url: `${getContextPath()}/api/registerform/update`,
                            type: 'POST',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (response) {
                                let modalBoxText = "WFH Form Approve Completed!"
                                if (userRole === "SERVICE_DESK") {
                                    modalBoxText = "WFH Form Suggest Completed!"
                                }
                                $('#message').text(response);
                                Swal.fire({
                                    title: "Success!",
                                    text: `${modalBoxText}`,
                                    icon: "success",
                                    confirmButtonText: "OK"
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.href = `${getContextPath()}/admin/viewFormList`;
                                    }
                                });
                            },
                            error: function (error) {
                                console.error('Error:', error);
                            }
                        });
                    } else {
                        console.log('Approver selection was canceled');
                        $('#approve-form-btn').click();
                    }
                })
            } else {
                console.log('Approver selection was canceled');
            }
        })
    }

    async function getAllApprover() {
        const response = await fetchApprovers();
        response.sort((a, b) => a.name.localeCompare(b.name));
        var selectBox = $('#approver-name');
        selectBox.empty();
        selectBox.append('<option value="" selected>Choose Approver Name </option>');
        for (var i = 0; i < response.length; i++) {
            if (response[i].name !== currentUser.name) {
                var option = $('<option>', {
                    value: response[i].id,
                    text: response[i].name,
                });
                selectBox.append(option);
            }
        }
        selectBox.on('change', function() {
            var selectedValue = $(this).val();
            console.log(selectedValue)
        });
    }

    $('#reject-form-btn').click(function (event) {
        console.log("hi")
        workFlowStatusId = flowStatusId
        approverId = currentUser.id
        registerFormId = formId
        state = false;
        if (userRole === 'PROJECT_MANAGER') {
            reason = pmReasonInputBox.val();
        }
        if (userRole === 'DEPARTMENT_HEAD') {
            reason = deptHeadReasonInputBox.val();
        }
        if (userRole === 'DIVISION_HEAD') {
            reason = divisionHeadReasonInputBox.val();
        }
        if (userRole === 'CISO') {
            reason = cisoReasonInputBox.val();
        }
        if (userRole === 'CEO') {
            reason = finalApprovalReasonInputBox.val();
        }
        if (userRole === 'SERVICE_DESK') {
            reason = serviceDeskReasonInputBox.val();
            approveDate = new Date()
        }
        approveDate = new Date();

        var formattedDate = approveDate.getFullYear() + '-' + (approveDate.getMonth() + 1).toString().padStart(2, '0') + '-' + approveDate.getDate().toString().padStart(2, '0');
        approveDate = formattedDate

        event.preventDefault();
        var requestData = {
            workFlowStatusId: workFlowStatusId,
            approverId: approverId,
            registerFormId: registerFormId,
            state: state,
            reason: reason,
            approveDate: approveDate,
        };

        var formData = new FormData();

        formData.append('workFlowStatusId', parseInt(workFlowStatusId));
        formData.append('approverId', parseInt(approverId));
        formData.append('registerFormId', parseInt(registerFormId));
        formData.append('state', state);
        formData.append('reason', reason);
        formData.append('approveDate', approveDate);
        formData.append('workFlowStatusDto', JSON.stringify(requestData));
        formData.append('newApproverId', newApproverId);
        rejectForm(formData);
    });

    function rejectForm(formData) {
        $.ajax({
            url: `${getContextPath()}/api/registerform/update`,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                let modalBoxText = "WFH Form Reject Completed!"
                if (userRole === "SERVICE_DESK") {
                    modalBoxText = "WFH Form Suggest Completed!"
                }
                $('#message').text(response);
                Swal.fire({
                    title: "Success!",
                    text: `${modalBoxText}`,
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = `${getContextPath()}/admin/viewFormList`;
                    }
                });
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    }
});
