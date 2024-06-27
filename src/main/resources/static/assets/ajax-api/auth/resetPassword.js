document.addEventListener("DOMContentLoaded", async function () {
    var emailParam = getQueryParam('email')
    console.log(emailParam)
    var email = decodeURIComponent(emailParam)
    const newPasswordError = document.getElementById('newPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    const form = document.getElementById('resetPasswordForm');

    if (form) {
        form.addEventListener('submit', handlePasswordChange);
    }

    async function handlePasswordChange(event) {
        event.preventDefault();
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        newPasswordError.innerText = '';
        confirmPasswordError.innerText = '';

        if (newPassword.length < 8) {
            newPasswordError.innerText = 'New password must be at least 8 characters long.';
            return;
        }

        if (!/[A-Z]/.test(newPassword)) {
            newPasswordError.innerText = 'New password must contain at least one uppercase letter.'
            return;
        }

        if (!/[a-z]/.test(newPassword)) {
            newPasswordError.innerText = 'New password must contain at least one lowercase letter.'
            return;
        }

        if (!/[0-9]/.test(newPassword)) {
            newPasswordError.innerText = 'New password must contain at least one number.'
            return;
        }

        if (newPassword !== confirmPassword) {
            confirmPasswordError.innerText = 'New password and confirm password do not match.'
            return;
        }

        try {
            await resetPassword(email, newPassword);
            console.log('Password change process completed successfully.');
        } catch (error) {
            console.error('Password change process failed:', error.message);
        }
    }
})