document.addEventListener('DOMContentLoaded', async function () {
    const currentUser = await getSessionUser()
    if (!currentUser) {
        Swal.fire('Error', 'User not logged in.', 'error');
        return;
    }

    const staffId = currentUser.staffId;
    console.log(staffId)
    const form = document.getElementById('changePasswordForm');

    if (form) {
        form.addEventListener('submit', handlePasswordChange);
    }

    async function validatePassword(staffId, password) {
        try {
            const response = await sendRequestWithTwoParams('/api/password/validatePassword', 'POST', 'staffId', staffId, 'password', password);

            if (!response.ok) {
                const errorMessage = await response.text();
                console.log(errorMessage)
                throw new Error(errorMessage);
            } else {
                console.log(response)
                const data = await response.text();
                console.log('Password validation successful:', data);
                return data;
            }

        } catch (error) {
            console.error('Password validation failed:', error.message);
            throw error;
        }
    }

    async function changePassword(staffId, currentPassword, newPassword) {
        try {
            const response = await sendRequestWithThreeParams('/api/password/changePassword', 'POST', 'staffId', staffId, 'currentPassword', currentPassword, 'newPassword', newPassword);

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            console.log('Password changed successfully');
            return true;
        } catch (error) {
            console.error('Password change failed:', error.message);
            throw error;
        }
    }

    async function handlePasswordChange(event) {
        event.preventDefault();

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword.length < 8) {
            Swal.fire('Error', 'New password must be at least 8 characters long.', 'error');
            return;
        }

        if (!/[A-Z]/.test(newPassword)) {
            Swal.fire('Error', 'New password must contain at least one uppercase letter.', 'error');
            return;
        }

        if (!/[a-z]/.test(newPassword)) {
            Swal.fire('Error', 'New password must contain at least one lowercase letter.', 'error');
            return;
        }

        if (!/[0-9]/.test(newPassword)) {
            Swal.fire('Error', 'New password must contain at least one digit.', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            Swal.fire('Error', 'New password and confirm password do not match.', 'error');
            return;
        }

        try {
            await validatePassword(staffId, currentPassword);
            await changePassword(staffId, currentPassword, newPassword);

            console.log('Password change process completed successfully.');
            Swal.fire('Success', 'Password changed successfully', 'success')
                .then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire('Please log in again', '', 'info').then(() => {
                            window.location.href = '/signOut';
                        });
                    }
                });
        } catch (error) {
            console.error('Password change process failed:', error.message);
            Swal.fire('Error', 'Password change failed: ' + error.message, 'error');
        }
    }
});
