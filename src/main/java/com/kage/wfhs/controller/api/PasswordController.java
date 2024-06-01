package com.kage.wfhs.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kage.wfhs.service.AuthService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/password")
@AllArgsConstructor
public class PasswordController {

    @Autowired
    private final AuthService authService;

    
}
