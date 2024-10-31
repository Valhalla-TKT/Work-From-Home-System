// forget password
async function checkEmailAndSendOTP(email) {
    try {
        return await sendRequestWithOneParam('/auth/api/checkEmail', 'POST', "email", email);
    } catch (error) {
        console.error('Error:', error);
        return error.message;
    }
}

async function verifyOtp(email, otp) {
    try {
        const response = await sendRequestWithTwoParams('/auth/api/verifyOtp', 'POST', 'email', email, 'otp', otp);
        await handleResponse(response);
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function resetPassword(email, newPassword) {
    try {
        const response = await sendRequestWithTwoParams('/auth/api/resetPassword', 'POST', 'email', email,'newPassword', newPassword);
        await handleResponse(response);
    } catch (error) {
        console.error('Error:', error);
    }
}