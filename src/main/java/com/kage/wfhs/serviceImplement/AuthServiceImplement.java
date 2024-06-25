package com.kage.wfhs.serviceImplement;

import com.kage.wfhs.exception.EntityNotFoundException;
import com.kage.wfhs.exception.IncorrectPasswordException;
import com.kage.wfhs.model.User;
import com.kage.wfhs.repository.UserRepository;
import com.kage.wfhs.service.AuthService;
import com.kage.wfhs.util.EmailSenderService;
import com.kage.wfhs.util.Helper;
import com.kage.wfhs.util.Message;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImplement.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailSenderService emailSenderService;
    private final Message message;
    private final Map<String, String> otpStore = new HashMap<>();

    @Override
    public boolean emailExists(String email, boolean forgotPassword) {
        logger.info("Checking if email exists: {}", email);
        User user = userRepository.findByEmail(email);
        boolean exists = user != null;
        logger.info("Email {} exists: {}", email, exists);
        if (exists && forgotPassword) {
            String staffID = user.getStaffId();
            String otp = Helper.generateOTP(email, staffID);
            otpStore.put(email, otp);
            String emailBody = "<p>Dear " + user.getName() + ",</p>" +
                    "<p>" + message.getEmailBodyForOtpInForgetPasswordProcessPart1() + "</p>" +
                    "<p><strong>" + otp + "</strong></p>" +
                    "<p>" + message.getEmailBodyForOtpInForgetPasswordProcessPart2() + "</p>" +
                    "<p>Best Regards,<br>DAT Support Team</p>";
            emailSenderService.sendEmail(
                    email,
                    message.getEmailSubjectForOtpInForgetPasswordProcess(),
                    emailBody
            );
        }
        return exists;
    }

    @Override
    public boolean validateCurrentPassword(String staffId, String currentPassword) {
        try {
            User user = findUserByStaffId(staffId);
            validatePassword(staffId, currentPassword, user);
            return true;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return false;
        }
    }

    @Override
    public void changePassword(String staffId, String currentPassword, String newPassword) {
        User user = findUserByStaffId(staffId);
        validatePassword(staffId, currentPassword, user);

        user.setPassword(passwordEncoder.encode(newPassword));
        if (user.isFirstTimeLogin()) {
            user.setFirstTimeLogin(false);
        }
        userRepository.save(user);
        logger.info("Password changed successfully for staff ID: {}", staffId);
    }

    private User findUserByStaffId(String staffId) {
        logger.info("Looking up user with staff ID: {}", staffId);
        User user = userRepository.findByStaffId(staffId);
        if(user == null) {
            throw logAndThrowEntityNotFoundException(staffId);
        }
        return user;
    }

    private void validatePassword(String staffId, String currentPassword, User user) {
        logger.info("Validating current password for staff ID: {}", staffId);
        if (user == null) {
            logger.error("User not found with staff ID: {}", staffId);
            throw new EntityNotFoundException("User not found with staff ID: " + staffId);
        }
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            String errorMessage = String.format("Current password is incorrect for user with staff ID: %s", staffId);
            logger.warn(errorMessage);
            throw new IncorrectPasswordException(errorMessage);
        }
        logger.info("Current password validated for staff ID: {}", staffId);
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        logger.info("Verifying OTP for email: {}", email);
        String storedOtp = otpStore.get(email);
        return storedOtp != null && storedOtp.equals(otp);
    }

    @Override
    public void resetPassword(String email, String newPassword) {
        logger.info("Resetting password for email: {}", email);
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new EntityNotFoundException("User not found with email: " + email);
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        otpStore.remove(email);
        logger.info("Password reset successfully for email: {}", email);
    }

    private EntityNotFoundException logAndThrowEntityNotFoundException(String staffId) {
        String errorMessage = String.format("User not found with staff ID: %s", staffId);
        logger.warn(errorMessage);
        return new EntityNotFoundException(errorMessage);
    }
}
