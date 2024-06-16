package com.kage.wfhs.controller.view.auth;

import com.kage.wfhs.dto.AuthDto;
import com.kage.wfhs.service.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthViewController {

    private final AuthService authService;

    @GetMapping("/forgetPassword")
    public ModelAndView forgetPassword(AuthDto authDto) {
        return new ModelAndView("auth/forgetPassword", "authDto", authDto);
    }

    @PostMapping("/forgetPassword")
    public String forgetPassword(@Valid AuthDto authDto, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("authDto", authDto);
            return "auth/forgetPassword";
        }
        if(authService.emailExists(authDto.getEmail(), true))
            return "/auth/otp";
        model.addAttribute("error", "Email does not exist");
        return "auth/forgetPassword";
    }


}
