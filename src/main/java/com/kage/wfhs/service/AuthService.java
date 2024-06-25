package com.kage.wfhs.service;

import org.springframework.stereotype.Service;

@Service
public interface AuthService {
	boolean emailExists(String email, boolean forgotPassword);

	boolean validateCurrentPassword(String staffId, String currentPassword);

	void changePassword(String userId, String currentPassword, String newPassword);

	boolean verifyOtp(String email, String otp);

	void resetPassword(String email, String newPassword);
}
