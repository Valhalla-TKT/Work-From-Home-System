package com.kage.wfhs.controller.view.auth;

import com.kage.wfhs.exception.EntityNotFoundException;
import com.kage.wfhs.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/api")
public class AuthApiController {

    private final AuthService authService;

    @PostMapping("/checkEmail")
    public ResponseEntity<?> forgetPassword(@RequestParam("email") String email) {
        try {
            authService.emailExists(email, true);
            return ResponseEntity.status(HttpStatus.OK).body("Mail Sent Successfully.");
        } catch (EntityNotFoundException incorrectPasswordException) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Please provide a valid email.");
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestParam("email") String email, @RequestParam("newPassword") String newPassword) {
        try {
            authService.resetPassword(email, newPassword);
            return ResponseEntity.status(HttpStatus.OK).body("Password Reset Successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Email or OTP.");
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
        }
    }
}
