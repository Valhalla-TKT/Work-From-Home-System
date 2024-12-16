document.addEventListener("DOMContentLoaded", () => {

    let applicantAppliedDate1WFA, applicantAppliedDate2WFA, registerFormId;
    const dateInputByApplicant1 = document.getElementById("date-input-by-applicant-1");
    const dateInputByApplicant2 = document.getElementById("date-input-by-applicant-2");
    const registerFormIdInput = document.getElementById("registerFormId");

    document.getElementById('update-wfa-check-list').addEventListener('click', function () {
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
                const form = document.getElementById('wfa-check-list-update-form');

                // You can submit the form directly:
                // form.submit();

                // Or perform an AJAX request if needed:
                updateChecklistData();
            }
        });
    });

    function updateChecklistData() {
        applicantAppliedDate1WFA = dateInputByApplicant1 ? dateInputByApplicant1.value : null;
        applicantAppliedDate2WFA = dateInputByApplicant2 ? dateInputByApplicant2.value : null;
        registerFormId = registerFormIdInput ? registerFormIdInput.value : null;

        if (!applicantAppliedDate1WFA || !applicantAppliedDate2WFA || applicantAppliedDate1WFA !== applicantAppliedDate2WFA) {
            Swal.fire({
                title: "Warning!",
                text: "Please ensure both Signed Dates are filled and match in the Checklist WFA.",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return;
        }

        const bodyPayload = new URLSearchParams({
            applicantAppliedDate: applicantAppliedDate2WFA,
            formId: registerFormId
        });

        fetch(`${getContextPath()}/api/wfa/update-wfa-checklist`, {
            method: 'POST',
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