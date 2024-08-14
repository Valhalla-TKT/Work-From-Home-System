$(document).ready(function () {

    const viewDetailUpdateBtn = $('#view-detail-update-btn')
    if (viewDetailUpdateBtn) {
        viewDetailUpdateBtn.hide();
    }

    const workingPlaceDisplayByFormId = $('#working-place-display-by-form-id')
    const fromDateDisplayByFormId = $('#from-date-display-by-form-id')
    const toDateDisplayByFormId = $('#to-date-display-by-form-id')
    const formRequestReasonDisplayDetail = $('#form-request-reason-display-detail')
    const signedDateDisplayByFormId = $("#signed-date-display-by-form-id")
    const windowOperatingSystemInputByFormId = $('#window-operating-system-input-by-form-id-view-detail')
    const windowSecurityPathInputByFormId = $('#window-security-path-input-by-form-id-view-detail')
    const windowAntivirusSoftwareInputByFormId = $('#window-antivirusSoftware-input-by-form-id-view-detail')
    const windowAntivirusPatternInputByFormId = $('#window-antivirusPattern-input-by-form-id-view-detail')
    const windowAntivirusFullScanInputByFormId = $('#window-antivirusFullScan-input-by-form-id-view-detail')
    
    const osTypeInput = $("#os-type-display-by-form-data")
    let osType
    if(osTypeInput) {
        osType = osTypeInput.val()
    }

    $(document).on('click', '.edit-icon-view-detail', function() {
        const inputField = $(this).closest('.text-field-edit').find('.editable-input');
        inputField.prop('disabled', false).focus();
        inputField[0].setSelectionRange(inputField.val().length, inputField.val().length);
        $(this).hide();
        viewDetailUpdateBtn.show();
    });

    $(document).on('blur', '.editable-input', function() {
        $(this).prop('disabled', true);
        $(this).closest('.text-field-edit').find('.edit-icon-view-detail').show();
    });

    $(document).on('click', '.edit-image-icon-view-detail', function() {
        const fileInput = $(this).closest('.user-form-container-2').find('.file-upload-input-view-detail');
        const fileUploadDesign = $(this).closest('.user-form-container-2').find('.file-upload-design');
        fileInput.show().focus();
        fileUploadDesign.hide();
        viewDetailUpdateBtn.show();
    });

    $(document).on('change', '.file-upload-input-view-detail', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = $(this).closest('.user-form-container-2').find('.file-upload-preview-view-detail');
                preview.attr('src', e.target.result).show();
                const fileUploadDesign = $(this).closest('.user-form-container-2').find('.file-upload-design');
                fileUploadDesign.show()
                $(this).hide();
            }.bind(this);
            reader.readAsDataURL(file);
        }
    });


    function formatDateInput(dateString) {
        const [day, month, year] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        const formattedYear = date.getFullYear();
        const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
        const formattedDay = String(date.getDate()).padStart(2, '0');
        return `${formattedYear}-${formattedMonth}-${formattedDay}`;
    }

    // let approverId
    // let hasApprover = false
    // viewDetailUpdateBtn.click(function(event) {
    //     //

    //     //
    //     event.preventDefault();
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "Do you want to proceed with updating the form?",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Yes, update it!',
    //         cancelButtonText: 'No, cancel!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             Swal.fire({
    //                 title: 'Approve with or without approver?',
    //                 text: "Do you want to approve with an approver?",
    //                 icon: 'question',
    //                 showCancelButton: true,
    //                 confirmButtonText: 'Yes, with approver',
    //                 cancelButtonText: 'No, without approver'
    //             }).then((secondResult) => {
    //                 if (secondResult.isConfirmed) {
    //                     hasApprover = true;
    //                     Swal.fire({
    //                         title: 'Approver Details',
    //                         html: `
    //                             <select id="approve-role" class="select" style="width: 100%; color: #0d0c22; border: 1px solid black; text-transform: capitalize;">
    //                                 <option selected value="" disabled>Choose Approver Role</option>
    //                             </select>
    //                             <br/><br/>
    //                             <select id="approver-name" class="select" style="width: 100%; color: #0d0c22; border: 1px solid black;">
    //                                <option selected value="" disabled>Choose Approver Name</option>
    //                            </select>`,
    //                         didOpen: async () => {
    //                             const approveRoleResponse = await fetchApproveRoleWithoutApplicant();
    //                             const approveRoleSelect = Swal.getPopup().querySelector('#approve-role');
    //                             const formatRoleName = (roleName) => {
    //                                 return roleName
    //                                     .replace(/_/g, ' ')
    //                                     .toLowerCase()
    //                                     .replace(/\b\w/g, char => char.toUpperCase());
    //                             };
    //                             approveRoleResponse.forEach(role => {
    //                                 const option = document.createElement('option');
    //                                 option.value = role.id;
    //                                 option.text = formatRoleName(role.name);
    //                                 approveRoleSelect.add(option);
    //                             });
                
    //                             approveRoleSelect.addEventListener('change', async () => {
    //                                 const selectedRoleId = approveRoleSelect.value;
    //                                 await getAllApprover(selectedRoleId, currentUser.name);
    //                             });
    //                         },
    //                         preConfirm: () => {
    //                             const approverRole = Swal.getPopup().querySelector('#approve-role').value;
    //                             const approverNameValue = Swal.getPopup().querySelector('#approver-name').value;
    //                             if (!reason) {
    //                                 Swal.showValidationMessage(`Please enter a reason`);
    //                                 return false;
    //                             }
    //                             if (!approverRole || !approverNameValue) {
    //                                 Swal.showValidationMessage(`Please choose both an approver role and an approver name.`);
    //                                 return false;
    //                             }
    //                             return { reason, approverNameValue };
    //                         },
    //                         showCancelButton: true,
    //                         confirmButtonText: 'Select',
    //                         cancelButtonText: 'Cancel'
    //                     }).then((result) => {
    //                         if (result.isConfirmed) {
    //                             const approverName = $('#approver-name').find('option:selected').text();
    //                             const { reason, approverNameValue } = result.value
    //                             console.log(reason)
    //                             Swal.fire({
    //                                 title: 'Are you sure?',
    //                                 text: `You selected ${approverName}. Do you want to proceed?`,
    //                                 icon: 'warning',
    //                                 showCancelButton: true,
    //                                 confirmButtonText: 'Yes, proceed',
    //                                 cancelButtonText: 'No, change selection'
    //                             }).then((confirmResult) => {
    //                                 if (confirmResult.isConfirmed) {
    //                                     approverId = approverNameValue
    //                                 } else {
    //                                     console.log("Cancel");
    //                                 }
    //                             })
    //                         }
    //                     });
    //                 } else {
    //                     hasApprover = false;
    //                 }
    //                 const formData = new FormData();
    //                 const workingPlaceDisplayByFormIdValue = workingPlaceDisplayByFormId.val()
    //                 // formData.append('workingPlace', workingPlaceDisplayByFormIdValue);

    //                 const fromDateDisplayByFormIdValue = fromDateDisplayByFormId.val()
    //                 const formattedFromDate = formatDateInput(fromDateDisplayByFormIdValue);
    //                 // formData.append('fromDate', formattedFromDate);

    //                 const toDateDisplayByFormIdValue = toDateDisplayByFormId.val()
    //                 const formattedToDate = formatDateInput(toDateDisplayByFormIdValue);
    //                 // formData.append('toDate', formattedToDate);

    //                 const formRequestReasonDisplayDetailValue = formRequestReasonDisplayDetail.val()
    //                 // formData.append('reason', formRequestReasonDisplayDetailValue);

    //                 const signedDateDisplayByFormIdValue = signedDateDisplayByFormId.val()
    //                 const formattedSignedDate = formatDateInput(signedDateDisplayByFormIdValue)
    //                 // formData.append('signedDate', formattedSignedDate);

    //                 const data = {
    //                     id: formId,
    //                     workingPlace: workingPlaceDisplayByFormIdValue,
    //                     requestReason: formRequestReasonDisplayDetailValue,
    //                     fromDate: formattedFromDate,
    //                     toDate: formattedToDate,
    //                     signedDate: formattedSignedDate,
    //                     approverId: approverId
    //                 };
    //                 formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

    //                 if(osType === "Window") {
    //                     const windowOperatingSystem = windowOperatingSystemInputByFormId[0].files[0];
    //                     if (windowOperatingSystem) {
    //                         formData.append('operatingSystem', windowOperatingSystem);
    //                     } else {
    //                         console.log("No file selected.");
    //                     }
                
    //                     const windowSecurityPath = windowSecurityPathInputByFormId[0].files[0];
    //                     if (windowSecurityPath) {
    //                         formData.append('securityPath', windowSecurityPath);
    //                     } else {
    //                         console.log("No file selected.");
    //                     }
                
    //                     const windowAntivirusSoftware = windowAntivirusSoftwareInputByFormId[0].files[0];
    //                     if (windowAntivirusSoftware) {
    //                         formData.append('antivirusSoftware', windowAntivirusSoftware);
    //                     } else {
    //                         console.log("No file selected.");
    //                     }
                
    //                     const windowAntivirusPattern = windowAntivirusPatternInputByFormId[0].files[0];
    //                     if (windowAntivirusPattern) {
    //                         formData.append('antivirusPattern', windowAntivirusPattern);
    //                     } else {
    //                         console.log("No file selected.");
    //                     }
                
    //                     const windowAntivirusFullScan = windowAntivirusFullScanInputByFormId[0].files[0];
    //                     if (windowAntivirusPattern) {
    //                         formData.append('antivirusFullScan', windowAntivirusFullScan);
    //                     } else {
    //                         console.log("No file selected.");
    //                     }
    //                 } else if(osType === "Mac") {
            
    //                 }
                    

    //                 formData.append('hasApprover', hasApprover);
    //                 $.ajax({
    //                     url: `${getContextPath()}/api/registerform/updateForm`,
    //                     type: 'POST',
    //                     data: formData,
    //                     processData: false,
    //                     contentType: false,
    //                     success: function(response) {
    //                         Swal.fire({
    //                             title: "Success!",
    //                             text: "Form updated successfully.",
    //                             icon: "success",
    //                             confirmButtonText: "OK"
    //                         }).then((result) => {
    //                             if (result.isConfirmed) {
    //                                 window.location.href = `${getContextPath()}/historyForm`;
    //                             }
    //                         });
    //                     },
    //                     error: function(xhr, status, error) {
    //                         Swal.fire({
    //                             title: "Error!",
    //                             text: "There was an error submitting the form.",
    //                             icon: "error",
    //                             confirmButtonText: "OK"
    //                         });
    //                     }
    //                 });
    //             });
    //         }
    //     })
    // });

    let approverId;
    let hasApprover = false;
    viewDetailUpdateBtn.click(function(event) {
        event.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to proceed with updating the form?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'No, cancel!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Approve with or without approver?',
                    text: "Do you want to approve with an approver?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, with approver',
                    cancelButtonText: 'No, without approver'
                }).then((secondResult) => {
                    if (secondResult.isConfirmed) {
                        hasApprover = true;
                        Swal.fire({
                            title: 'Approver Details',
                            html: `
                                <select id="approve-role" class="select" style="width: 100%; color: #0d0c22; border: 1px solid black; text-transform: capitalize;">
                                    <option selected value="" disabled>Choose Approver Role</option>
                                </select>
                                <br/><br/>
                                <select id="approver-name" class="select" style="width: 100%; color: #0d0c22; border: 1px solid black;">
                                <option selected value="" disabled>Choose Approver Name</option>
                            </select>`,
                            didOpen: async () => {
                                const approveRoleResponse = await fetchApproveRoleWithoutApplicant();
                                const approveRoleSelect = Swal.getPopup().querySelector('#approve-role');
                                const formatRoleName = (roleName) => {
                                    return roleName
                                        .replace(/_/g, ' ')
                                        .toLowerCase()
                                        .replace(/\b\w/g, char => char.toUpperCase());
                                };
                                approveRoleResponse.forEach(role => {
                                    const option = document.createElement('option');
                                    option.value = role.id;
                                    option.text = formatRoleName(role.name);
                                    approveRoleSelect.add(option);
                                });
                
                                approveRoleSelect.addEventListener('change', async () => {
                                    const selectedRoleId = approveRoleSelect.value;
                                    await getAllApprover(selectedRoleId, currentUser.name);
                                });
                            },
                            preConfirm: () => {
                                const approverRole = Swal.getPopup().querySelector('#approve-role').value;
                                const approverNameValue = Swal.getPopup().querySelector('#approver-name').value;
                                if (!approverRole || !approverNameValue) {
                                    Swal.showValidationMessage(`Please choose both an approver role and an approver name.`);
                                    return false;
                                }
                                approverId = approverNameValue;
                                return true;
                            },
                            showCancelButton: true,
                            confirmButtonText: 'Select',
                            cancelButtonText: 'Cancel'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                updateForm();
                            }
                        });
                    } else {
                        hasApprover = false;
                        updateForm();
                    }
                });
            }
        });
    });

    function updateForm() {
        const formData = new FormData();
        const workingPlaceDisplayByFormIdValue = workingPlaceDisplayByFormId.val();
        formData.append('workingPlace', workingPlaceDisplayByFormIdValue);

        const fromDateDisplayByFormIdValue = fromDateDisplayByFormId.val();
        const formattedFromDate = formatDateInput(fromDateDisplayByFormIdValue);
        formData.append('fromDate', formattedFromDate);

        const toDateDisplayByFormIdValue = toDateDisplayByFormId.val();
        const formattedToDate = formatDateInput(toDateDisplayByFormIdValue);
        formData.append('toDate', formattedToDate);

        const formRequestReasonDisplayDetailValue = formRequestReasonDisplayDetail.val();
        formData.append('reason', formRequestReasonDisplayDetailValue);

        const signedDateDisplayByFormIdValue = signedDateDisplayByFormId.val();
        const formattedSignedDate = formatDateInput(signedDateDisplayByFormIdValue);
        formData.append('signedDate', formattedSignedDate);

        const data = {
            id: formId,
            workingPlace: workingPlaceDisplayByFormIdValue,
            requestReason: formRequestReasonDisplayDetailValue,
            fromDate: formattedFromDate,
            toDate: formattedToDate,
            signedDate: formattedSignedDate,
            approverId: approverId
        };
        formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

        if(osType === "Window") {
            const windowOperatingSystem = windowOperatingSystemInputByFormId[0].files[0];
            if (windowOperatingSystem) {
                formData.append('operatingSystem', windowOperatingSystem);
            } else {
                console.log("No file selected.");
            }

            const windowSecurityPath = windowSecurityPathInputByFormId[0].files[0];
            if (windowSecurityPath) {
                formData.append('securityPath', windowSecurityPath);
            } else {
                console.log("No file selected.");
            }

            const windowAntivirusSoftware = windowAntivirusSoftwareInputByFormId[0].files[0];
            if (windowAntivirusSoftware) {
                formData.append('antivirusSoftware', windowAntivirusSoftware);
            } else {
                console.log("No file selected.");
            }

            const windowAntivirusPattern = windowAntivirusPatternInputByFormId[0].files[0];
            if (windowAntivirusPattern) {
                formData.append('antivirusPattern', windowAntivirusPattern);
            } else {
                console.log("No file selected.");
            }

            const windowAntivirusFullScan = windowAntivirusFullScanInputByFormId[0].files[0];
            if (windowAntivirusPattern) {
                formData.append('antivirusFullScan', windowAntivirusFullScan);
            } else {
                console.log("No file selected.");
            }
        } else if(osType === "Mac") {

        }

        formData.append('hasApprover', hasApprover);
        $.ajax({
            url: `${getContextPath()}/api/registerform/updateForm`,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                Swal.fire({
                    title: "Success!",
                    text: "Form updated successfully.",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = `${getContextPath()}/historyForm`;
                    }
                });
            },
            error: function(xhr, status, error) {
                Swal.fire({
                    title: "Error!",
                    text: "There was an error submitting the form.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }
        });
    }

    async function getAllApprover(approveRoleId, name) {
		const response = await fetchApproversByApproveRoleId(approveRoleId);
		console.log(response)
		var selectBox = $('#approver-name');
		selectBox.empty();
		selectBox.append('<option value="" selected>Choose Approver Name</option>');
		for (var i = 0; i < response.length; i++) {
			if (response[i].name !== name) {
				var option = $('<option>', {
					value: response[i].id,
					text: response[i].name,
					'data-staff-id': response[i].staffId,
				});
				selectBox.append(option);
			}
		}
		selectBox.on('change', function() {
			approverId = $(this).val()
		});
	}


    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const formIdInput = $("#form-id-display-by-form-data")
    const userId = currentUser.id;
    var formId = formIdInput.val()
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

    getFormDetailsById(formId, userId);
    function getFormDetailsById(formId, userId) {
        $.ajax({
            url: `${getContextPath()}/api/registerform/getFormById?formId=${formId}&userId=${userId}`,
            type: 'POST',
            contentType: 'application/json',
            success: function (response) {

                var workFlowStatuses = response.workFlowStatus;
                const formatRoleName = (roleName) => {
                    return roleName
                        .replace(/_/g, ' ')
                        .toLowerCase()
                        .replace(/\b\w/g, char => char.toUpperCase());
                };
                workFlowStatuses.forEach(function(status) {
                    if (status.status.toLowerCase() !== 'pending') {
                        var approveRoleName = formatRoleName(status.approveRole.name)
                        var approvalSectionHtml = `
                            <section data-v-741dde45="" data-v-115a39aa="" id="${status.approveRole.name.toLowerCase()}-approval-output-section"
                                    class="user-form-container-2 user-form display-flex">
                                <div class="pledge-container">
                                    <div class="pledge-heading">
                                        <h2>${approveRoleName} Approval <span style="font-size: 18px;">(${status.approverName})</span></h2>
                                    </div>
                                </div>
                                <div class="final-form">
                                    <div class="display-flex approval-final">
                                        <span>Approve Status :</span>
                                        <div class="final-display-input" id="${status.approveRole.name.toLowerCase()}-approval-status">
                                            <div class="display-flex w-50">
                                                <div class="display-data">
                                                    <input class="radio-button__input" style="border: 1px solid black;" type="radio" name="${status.approveRole.name.toLowerCase()}-approval" value="yes" ${status.state ? 'checked' : ''} disabled>
                                                </div>
                                                <div class="display-data" style="margin-right: 10px;">Approve</div>
                                            </div>
                                            <div class="display-flex w-50">
                                                <div class="display-data">
                                                    <input class="radio-button__input" style="border: 1px solid black;" type="radio" name="${status.approveRole.name.toLowerCase()}-approval" value="no" ${!status.state ? 'checked' : ''} disabled>
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
                    }
                });
            },
            error: function (error) {
                console.error('Error fetching division data:', error);
            }
        });
    }
    function formatDate(dateString) {
        var approveDate = new Date(dateString);
        var day = approveDate.getDate();
        var month = approveDate.getMonth() + 1;
        var year = approveDate.getFullYear();

        day = (day < 10) ? '0' + day : day;
        month = (month < 10) ? '0' + month : month;

        return day + '-' + month + '-' + year;
    }
});