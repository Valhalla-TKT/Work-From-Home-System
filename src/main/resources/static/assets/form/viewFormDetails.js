$(document).ready(function () {
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