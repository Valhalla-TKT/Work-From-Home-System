const submitButton = document.querySelector('.btn-add-user');
const staffIdInput = document.getElementById('staffId');
const form = document.getElementById('employeeForm');
const nameErrorMessage = document.getElementById('nameErrorMessage');
const staffIdErrorMessage = document.getElementById('staffIdErrorMessage');
const emailErrorMessage = document.getElementById('emailErrorMessage');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');

fullNameInput.addEventListener('input', function() {

    const name = fullNameInput.value.trim();

    fetch(`${getContextPath()}/api/user/check-name?name=${name}`)
        .then(response => response.json())
        .then(exists => {
            submitButton.disabled = exists;
            nameErrorMessage.innerText = `User with name '${name}' already exists.`
            nameErrorMessage.style.display = exists ? 'inline-flex' : 'none';
        })
        .catch(error => {
            console.error('Error checking staff ID existence:', error);
            submitButton.disabled = false;
        });

    const fullName = fullNameInput.value.trim().toLowerCase().replace(/\s+/g, '');
    emailInput.value = fullName ? `${fullName}@diracetechnology.com` : '';
});

function checkStaffIdExistence() {

    const staffId = staffIdInput.value.trim();

    if (!staffId) {
        submitButton.disabled = false;
        return;
    }

    fetch(`${getContextPath()}/api/user/check-staff-id?staffId=${staffId}`)
        .then(response => response.json())
        .then(exists => {
            submitButton.disabled = exists;
            staffIdErrorMessage.innerText = `Staff ID '${staffId}' already exists.`
            staffIdErrorMessage.style.display = exists ? 'inline-flex' : 'none';
        })
        .catch(error => {
            console.error('Error checking staff ID existence:', error);
            submitButton.disabled = false;
        });
}

emailInput.addEventListener('input', function() {

    const email = emailInput.value.trim();

    fetch(`${getContextPath()}/api/user/check-email?email=${email}`)
        .then(response => response.json())
        .then(exists => {
            submitButton.disabled = exists;
            emailErrorMessage.innerText = `User with email '${email}' already exists.`
            emailErrorMessage.style.display = exists ? 'inline-flex' : 'none';
        })
        .catch(error => {
            console.error('Error checking staff ID existence:', error);
            submitButton.disabled = false;
        });
});

submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    form.querySelectorAll('input, select').forEach(function(input) {
        input.classList.add('submitted');
    });

    if (form.checkValidity()) {
        Swal.fire({
            title: 'Confirm Submission',
            text: "Are you sure you want to add this user?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, submit it!'
        }).then((result) => {
            if (result.isConfirmed) {
                form.submit();
                Swal.fire(
                    'Submitted!',
                    'Your user has been added successfully.',
                    'success'
                );
            }
        });
    }
});