document.addEventListener('DOMContentLoaded', async function () {
    const togglePasswordVisibility = (inputId, iconId) => {
        const passwordInput = document.getElementById(inputId);
        const toggleIcon = document.getElementById(iconId);

        toggleIcon.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    };

    togglePasswordVisibility('currentPassword', 'toggleCurrentPassword');
    togglePasswordVisibility('newPassword', 'toggleNewPassword');
    togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(!currentUser) {
        currentUser = await getSessionUser()
    }

    const userId = currentUser.id
    if (!currentUser) {
        Swal.fire('Error', 'User not logged in.', 'error');
        return;
    }

    const editPositionButton = document.querySelector('.btn2.edit-position');
    if (editPositionButton) {
        editPositionButton.addEventListener('click', async function () {
            Swal.fire({
                title: 'Edit Position',
                html: `
                <input type="text" id="position" class="swal-input" placeholder="Enter new position">
            `,
                showCancelButton: true,
                confirmButtonText: 'Save',
                preConfirm: async () => {
                    const position = Swal.getPopup().querySelector('#position').value;
                    if (!position) {
                        Swal.showValidationMessage('Position cannot be empty');
                        return;
                    }
                    try {
                        await changePosition(userId, position);
                        updatePositionInDOM(position);
                        updatePositionInLocalStorage(position);
                        Swal.fire('Success', 'Position changed successfully', 'success');
                    } catch (error) {
                        Swal.fire('Error', 'Failed to change position', 'error');
                    }
                }
            });
        })
    }

    async function changePosition(userId, position) {
        try {
            const response = await fetch(`${getContextPath()}/api/user/changePosition/${userId}?position=${encodeURIComponent(position)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to change position:', error);
            throw error;
        }
    }

    function updatePositionInDOM(position) {
        const positionElement = document.getElementById('profile_page_position');
        const navPositionElement = document.querySelector('.nav-v2-position');
        if (positionElement && navPositionElement) {
            positionElement.textContent = position;
            navPositionElement.textContent = position;
        }
    }

    function updatePositionInLocalStorage(position) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            currentUser.positionName = position;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }

    const staffId = currentUser.staffId;
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

    document.getElementById('currentPassword').addEventListener('input', () => {
        hideError('currentPasswordError');
    });

    document.getElementById('newPassword').addEventListener('input', () => {
        const newPassword = document.getElementById('newPassword').value;
        if (newPassword.length >= 8 &&
            /[A-Z]/.test(newPassword) &&
            /[a-z]/.test(newPassword) &&
            /[0-9]/.test(newPassword)) {
            hideError('newPasswordError');
        }
    });

    document.getElementById('confirmPassword').addEventListener('input', () => {
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (newPassword === confirmPassword) {
            hideError('confirmPasswordError');
        }
    });

    async function handlePasswordChange(event) {
        event.preventDefault();

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const currentPasswordError = document.getElementById('currentPasswordError')
        const newPasswordError = document.getElementById('newPasswordError')
        const confirmPasswordError = document.getElementById('confirmPasswordError')

        if (currentPassword.length === 0) {
            currentPasswordError.innerText = 'Current password is required.'
            newPasswordError.innerText = ''
            confirmPasswordError.innerText = ''
            return;
        }

        if (newPassword.length < 8) {
            currentPasswordError.innerText = ''
            newPasswordError.innerText = 'New password must be at least 8 characters long.'
            confirmPasswordError.innerText = ''
            return;
        }

        if (!/[A-Z]/.test(newPassword)) {
            currentPasswordError.innerText = ''
            newPasswordError.innerText = 'New password must contain at least one uppercase letter.'
            confirmPasswordError.innerText = ''
            return;
        }

        if (!/[a-z]/.test(newPassword)) {
            currentPasswordError.innerText = ''
            newPasswordError.innerText = 'New password must contain at least one lowercase letter.'
            confirmPasswordError.innerText = ''
            return;
        }

        if (!/[0-9]/.test(newPassword)) {
            currentPasswordError.innerText = ''
            newPasswordError.innerText = 'New password must contain at least one digit.'
            confirmPasswordError.innerText = ''
            return;
        }

        if (newPassword !== confirmPassword) {
            currentPasswordError.innerText = ''
            newPasswordError.innerText = ''
            confirmPasswordError.innerText = 'New password and confirm password do not match.'
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
                            localStorage.removeItem('currentUser');
                            window.location.href = `${getContextPath()}/signOut`;
                        });
                    }
                });
        } catch (error) {
            console.error('Password change process failed:', error.message);
            currentPasswordError.innerText = 'Current password is incorrect. Please enter the correct password.'
            newPasswordError.innerText = ''
            confirmPasswordError.innerText = ''

        }
    }

    function hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.innerText = '';
    }

});
