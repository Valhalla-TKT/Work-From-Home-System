package com.kage.wfhs.serviceImplement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kage.wfhs.model.User;
import com.kage.wfhs.repository.UserRepository;
import com.kage.wfhs.service.AuthService;
import com.kage.wfhs.util.EntityUtil;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthServiceImplement implements AuthService {

	@Autowired
	private final UserRepository userRepository;

	@Autowired
	private final PasswordEncoder passwordEncoder;

	@Override
	public boolean emailExists(String email) {
        return userRepository.findByEmail(email) != null;
	}

	@Override
	public boolean validateCurrentPassword(Long userId, String currentPassword) {
		User user = EntityUtil.getEntityById(userRepository, userId);
        if (user != null) {
            return passwordEncoder.matches(currentPassword, user.getPassword());
        }
        return false;
	}

	@Override
	public void sendPasswordResetLink(String email) {
		User user = userRepository.findByEmail(email);
        // if (user != null) {
        //     String token = UUID.randomUUID().toString();
        //     PasswordResetToken resetToken = new PasswordResetToken(token, user);
        //     tokenRepository.save(resetToken);
        //     emailService.sendPasswordResetEmail(user.getEmail(), token);
        // }
	}

	@Override
	public void updatePassword(String newPassword) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void changePassword(String userId, String currentPassword, String newPassword) {
		// TODO Auto-generated method stub
		
	}

}
