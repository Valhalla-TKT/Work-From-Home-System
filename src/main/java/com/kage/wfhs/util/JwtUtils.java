/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-07-26
 * @Time  		 : 00:45
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.util;

import org.springframework.stereotype.Component;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtUtils {

    private final JwtUtil jwtUtil;

    public JwtUtils(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    /**
     * Extracts JWT token from the Authorization header.
     *
     * @param request the HTTP request containing the Authorization header
     * @return the JWT token if present, otherwise null
     */
    public String extractTokenFromHeader(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

    /**
     * Validates the JWT token.
     *
     * @param token the JWT token
     * @return true if the token is valid, otherwise false
     */
    public boolean validateToken(String token) {
        return jwtUtil.validateToken(token);
    }
}
