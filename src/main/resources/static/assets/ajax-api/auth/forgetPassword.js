
document.addEventListener("DOMContentLoaded", async function () {
    const sendOtpButton = document.getElementById('sendOtpButton');
    sendOtpButton.addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const result = await checkEmailAndSendOTP(email);

        if (typeof result === 'string') {
            document.getElementById('forgetPasswordError').innerText = "Please provide a valid email.";
        } else {
            sendOtpButton.disabled = true;
            let countdown = 60;
            sendOtpButton.value = ` (${countdown}s)`;

            const interval = setInterval(() => {
                countdown -= 1;
                sendOtpButton.value = `(${countdown}s)`;

                if (countdown <= 0) {
                    clearInterval(interval);
                    sendOtpButton.disabled = false;
                    sendOtpButton.value = 'Send OTP';
                }
            }, 1000);
        }
    });

    document.getElementById('verifyOtpButton').addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const otp = document.getElementById('otp').value;

        const otpResponse = await verifyOtp(email, otp).text()
        alert(otpResponse)
        if (otpResponse === "OTP Verified Successfully.")
            alert(otpResponse)

    });
})
