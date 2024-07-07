package com.kage.wfhs.controller.view.auth;

import com.kage.wfhs.dto.AuthDto;
import com.kage.wfhs.exception.EntityNotFoundException;
import com.kage.wfhs.service.AuthService;
import com.kage.wfhs.util.Message;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthViewController {

    private final AuthService authService;

    Logger logger = LoggerFactory.getLogger(this.getClass());

    private final Message message;

    @GetMapping("/forgetPassword")
    public ModelAndView forgetPassword(AuthDto authDto) {
        return new ModelAndView("auth/forgotPassword", "authDto", authDto);
    }

    @PostMapping("/verifyOtp")
    public String verifyOtp(@RequestParam("email") String email, @RequestParam("otp") String otp, Model model) {
        try {
            boolean isValid = authService.verifyOtp(email, otp);
            if (isValid) {
                String encodedEmail = URLEncoder.encode(email, StandardCharsets.UTF_8);
                return "redirect:/auth/resetPassword?email=" + encodedEmail;
            } else {
                setErrorMessage(model, message.getOtpErrorMessage());
                return "auth/forgotPassword";
            }
        } catch (EntityNotFoundException e) {
            setErrorMessage(model, message.getOtpErrorMessage());
            return "auth/forgotPassword";
        } catch (Exception exception) {
            setErrorMessage(model, message.getUnexpectedError());
            logException(exception);
            return "auth/forgotPassword";
        }
    }

    @GetMapping("/resetPassword")
    public ModelAndView resetPassword(@RequestParam("email") String email, AuthDto authDto) {
        return new ModelAndView("auth/resetPassword", "authDto", authDto);
    }

    private void setErrorMessage(Model model, String message) {
        model.addAttribute("forgetPasswordError", message);
    }

    private void logException(Exception exception) {
        logger.error("Error during OTP verification", exception);
    }
}
