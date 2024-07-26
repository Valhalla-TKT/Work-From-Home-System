package com.kage.wfhs.config;

import com.kage.wfhs.util.JwtUtil;
import com.kage.wfhs.util.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {
    @Bean
    public JwtUtils jwtUtils(JwtUtil jwtUtil) {
        return new JwtUtils(jwtUtil);
    }
}
