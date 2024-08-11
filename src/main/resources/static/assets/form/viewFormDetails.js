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

    viewDetailUpdateBtn.click(function(event) {
        event.preventDefault();
        const formData = new FormData();
        const workingPlaceDisplayByFormIdValue = workingPlaceDisplayByFormId.val()
        formData.append('workingPlace', workingPlaceDisplayByFormIdValue);

        const fromDateDisplayByFormIdValue = fromDateDisplayByFormId.val()
        const formattedFromDate = formatDateInput(fromDateDisplayByFormIdValue);
        formData.append('fromDate', formattedFromDate);

        const toDateDisplayByFormIdValue = toDateDisplayByFormId.val()
        const formattedToDate = formatDateInput(toDateDisplayByFormIdValue);
        formData.append('toDate', formattedToDate);

        const formRequestReasonDisplayDetailValue = formRequestReasonDisplayDetail.val()
        formData.append('reason', formRequestReasonDisplayDetailValue);

        const signedDateDisplayByFormIdValue = signedDateDisplayByFormId.val()
        const formattedSignedDate = formatDateInput(signedDateDisplayByFormIdValue)
        formData.append('signedDate', formattedSignedDate);

        const data = {
            id: formId,
            workingPlace: workingPlaceDisplayByFormIdValue,
            requestReason: formRequestReasonDisplayDetailValue,
            fromDate: formattedFromDate,
            toDate: formattedToDate,
            signedDate: formattedSignedDate,
        };

        formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));
        const windowOperatingSystem = windowOperatingSystemInputByFormId[0].files[0];
        if (windowOperatingSystem) {
            formData.append('operatingSystem', windowOperatingSystem);
        } else {
            console.log("No file selected.");
        }

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

    });

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