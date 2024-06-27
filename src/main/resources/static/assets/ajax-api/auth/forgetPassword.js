// async function checkAndSendEmail() {
//     const response = await checkEmailAndSendOTP("thanthtoo1285@gmail.com")
//     console.log(response.status)
// }
document.addEventListener("DOMContentLoaded", async function () {
    document.getElementById('sendOtpButton').addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        await checkEmailAndSendOTP(email);
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
