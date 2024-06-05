package com.kage.wfhs.service;

import org.springframework.stereotype.Service;

@Service
public interface AuthService {
	boolean emailExists(String email);

	boolean validateCurrentPassword(Long userId, String currentPassword);

	void sendPasswordResetLink(String email);

	void updatePassword(String newPassword);

	void changePassword(String userId, String currentPassword, String newPassword);
}
