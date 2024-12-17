document.addEventListener("DOMContentLoaded", function() {
    const viewButtons = document.querySelectorAll('.view-button');

    viewButtons.forEach(button => {
        console.log("hi")
        button.addEventListener('click', function() {
            const hashFormId = button.getAttribute('data-hash-form-id');

            window.location.href = `${getContextPath()}/admin/form/${hashFormId}/wfa/view-wfa-checklist-by-approver`;
        });
    });
});