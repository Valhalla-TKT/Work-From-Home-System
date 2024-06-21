package com.kage.wfhs.controller.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kage.wfhs.service.AuthService;
import com.kage.wfhs.exception.EntityNotFoundException;
import com.kage.wfhs.exception.IncorrectPasswordException;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/password")
@AllArgsConstructor
public class PasswordController {

    private final AuthService authService;

    @PostMapping("/validatePassword")
    public ResponseEntity<?> validatePassword(@RequestParam("staffId") String staffId, @RequestParam("password") String password) {
        try {
            boolean isValid = authService.validateCurrentPassword(staffId, password);
            return ResponseEntity.ok(isValid);
        } catch (EntityNotFoundException | IncorrectPasswordException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestParam("staffId") String staffId, @RequestParam("currentPassword") String currentPassword, @RequestParam("newPassword") String newPassword) {
        try {
            authService.changePassword(staffId, currentPassword, newPassword);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException | IncorrectPasswordException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
