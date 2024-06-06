package com.kage.wfhs.serviceImplement;

import com.kage.wfhs.exception.EntityNotFoundException;
import com.kage.wfhs.exception.IncorrectPasswordException;
import com.kage.wfhs.model.User;
import com.kage.wfhs.repository.UserRepository;
import com.kage.wfhs.service.AuthService;
import com.kage.wfhs.service.UserService;
import com.kage.wfhs.util.EntityUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@AllArgsConstructor
public class AuthServiceImplement implements AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImplement.class);

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Override
    public boolean emailExists(String email) {
        logger.info("Checking if email exists: {}", email);
        boolean exists = userRepository.findByEmail(email) != null;
        logger.info("Email {} exists: {}", email, exists);
        return exists;
    }

    @Override
    public boolean validateCurrentPassword(String staffId, String currentPassword) {
        logger.info("Validating current password for staff ID: {}", staffId);
        User user = userRepository.findByStaffId(staffId);
        if (user == null) {
            logger.error("User not found with staff ID: {}", staffId);
            throw new EntityNotFoundException("User not found with staff ID: " + staffId);
        }
        boolean matches = passwordEncoder.matches(currentPassword, user.getPassword());
        if (!matches) {
            logger.error("Current password is incorrect for user with staff ID: {}", staffId);
            throw new IncorrectPasswordException("Current password is incorrect.");
        }
        logger.info("Current password validated for staff ID: {}", staffId);
        return matches;
    }

    @Override
    public void changePassword(String staffId, String currentPassword, String newPassword) {
        logger.info("Changing password for staff ID: {}", staffId);
        User user = userRepository.findByStaffId(staffId);
        if (user == null) {
            logger.error("User not found with staff ID: {}", staffId);
            throw new EntityNotFoundException("User not found with staff ID: " + staffId);
        }

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            logger.error("Current password is incorrect for user with staff ID: {}", staffId);
            throw new IncorrectPasswordException("Current password is incorrect for user with staff ID: " + staffId);
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        if (user.isFirstTimeLogin()) {
            user.setFirstTimeLogin(false);
        }
        EntityUtil.saveEntity(userRepository, user, "user");
        logger.info("Password changed successfully for staff ID: {}", staffId);
    }
}
