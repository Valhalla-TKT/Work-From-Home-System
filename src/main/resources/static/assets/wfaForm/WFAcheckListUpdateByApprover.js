document.addEventListener("DOMContentLoaded", () => {

    let dateApprovedByApprover, registerFormId, approverId; // data send to backend

    const nameInputByProjectManager = document.getElementById("name-input-by-pm");
    const dateInputByProjectManager = document.getElementById("date-input-by-pm");
    const nameInputByDeptHead = document.getElementById("name-input-by-dept-head");
    const dateInputByDeptHead = document.getElementById("date-input-by-dept-head");
    const nameInputByDivisionHead = document.getElementById("name-input-by-division-head");
    const dateInputByDivisionHead = document.getElementById("date-input-by-division-head");
    // console.log(nameInputByProjectManager, nameInputByDeptHead, nameInputByDivisionHead, dateInputByProjectManager, dateInputByDeptHead, dateInputByDivisionHead);

    const registerFormIdInput = document.getElementById("registerFormId");
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var approveRoles = currentUser.approveRoles;
    var userRole;
    approveRoles.forEach(function(approveRole) {
        userRole = approveRole.name;
    });


    document.getElementById('update-wfa-check-list-by-approver').addEventListener('click', function () {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to update the WFA checklist?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0d0c22',
            cancelButtonColor: '#fff',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const form = document.getElementById('wfa-check-list-update-form-by-approver');

                // You can submit the form directly:
                // form.submit();

                // Or perform an AJAX request if needed:
                updateChecklistDataByApprover();
            }
        });
    });

    function updateChecklistDataByApprover() {

        if (userRole === "PROJECT_MANAGER") {
            dateApprovedByApprover = dateInputByProjectManager ? dateInputByProjectManager.value : null;
        } else if (userRole === "DEPARTMENT_HEAD") {
            dateApprovedByApprover = dateInputByDeptHead ? dateInputByDeptHead.value : null;
        } else if(userRole === "DIVISION_HEAD") {
            dateApprovedByApprover = dateInputByDivisionHead ? dateInputByDivisionHead.value : null;
        }

        registerFormId = registerFormIdInput ? registerFormIdInput.value : null;

        const bodyPayload = new URLSearchParams({
            approverId: currentUser.id,
            applicantAppliedDate: dateApprovedByApprover,
            formId: registerFormId
        });

        fetch(`${getContextPath()}/api/wfa/update-wfa-checklist-by-approver`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: bodyPayload
        })
            .then(response => response.text())
            .then(data => {
                Swal.fire('Updated!', 'The WFA checklist has been updated.', 'success');
            })
            .catch(error => {
                Swal.fire('Error!', 'There was an issue updating the checklist.', 'error');
            });
    }
})