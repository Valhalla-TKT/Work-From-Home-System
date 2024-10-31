/*
 * @Author       : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date         : 2024-07-27
 * @Time         : 21:56
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    /**
     * Handles unauthorized requests by redirecting to the login page.
     *
     * @param request       the HTTP request
     * @param response      the HTTP response
     * @param authException the authentication exception that triggered this entry point
     * @throws IOException      in case of an input/output error
     * @throws ServletException in case of a servlet error
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        // Log the exception
        System.out.println("Unauthorized request - " + authException.getMessage());

        // Redirect to the login page or return a 401 response
        response.sendRedirect(request.getContextPath() + "/login");
    }
}
