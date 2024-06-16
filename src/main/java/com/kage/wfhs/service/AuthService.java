package com.kage.wfhs.service;

import org.springframework.stereotype.Service;

@Service
public interface AuthService {
	boolean emailExists(String email, boolean forgotPassword);

	boolean validateCurrentPassword(String staffId, String currentPassword);

	void changePassword(String userId, String currentPassword, String newPassword);
}
