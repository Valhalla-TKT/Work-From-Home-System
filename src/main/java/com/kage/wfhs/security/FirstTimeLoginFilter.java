package com.kage.wfhs.security;

import com.kage.wfhs.dto.UserDto;
import com.kage.wfhs.model.ApproveRole;
import com.kage.wfhs.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class FirstTimeLoginFilter extends OncePerRequestFilter {

    private final UserService userService;

    public FirstTimeLoginFilter(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            UserDto userDto = userService.getUserBystaffId(authentication.getName());
            if (userDto != null && userDto.isFirstTimeLogin()) {
                Set<String> roles = userDto.getApproveRoles().stream().map(ApproveRole::getName).collect(Collectors.toSet());
                if (roles.contains("HR")) {
                    response.sendRedirect("/importExcel");
                    return;
                } else if (roles.contains("APPLICANT")) {
                    response.sendRedirect("/profile");
                    return;
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}
