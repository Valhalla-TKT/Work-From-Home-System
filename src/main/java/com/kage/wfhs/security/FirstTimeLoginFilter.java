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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class FirstTimeLoginFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(FirstTimeLoginFilter.class);
    private final UserService userService;

    public FirstTimeLoginFilter(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String requestURI = request.getRequestURI();

        // Allow requests to static resources and specific endpoints
        if (requestURI.startsWith("/static/") || requestURI.startsWith("/assets/") ||
                requestURI.startsWith("/api/session/") || requestURI.startsWith("/swagger-ui/") || requestURI.startsWith("/api/password/") ||
                requestURI.startsWith("/icons/") || requestURI.startsWith("/formImages/") ||
                requestURI.startsWith("/images/") || requestURI.startsWith("/ws/") ||
                requestURI.equals("/login") || requestURI.equals("/profile") || requestURI.equals("/admin/importExcel")) {
            filterChain.doFilter(request, response);
            return;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            UserDto userDto = (UserDto) request.getSession().getAttribute("login-user");
            if (userDto == null) {
                logger.debug("Fetching user details from database for: " + authentication.getName());
                userDto = userService.getLoginUserBystaffId(authentication.getName());
                request.getSession().setAttribute("login-user", userDto);
            }

            if (userDto != null && userDto.isFirstTimeLogin()) {
                Set<String> roles = userDto.getApproveRoles().stream().map(ApproveRole::getName).collect(Collectors.toSet());
                if (roles.contains("HR")) {
                    logger.debug("Redirecting to /importExcel");
                    response.sendRedirect("/admin/importExcel");
                    return;
                } else if (roles.contains("APPLICANT")) {
                    logger.debug("Redirecting to /profile");
                    response.sendRedirect("/profile");
                    return;
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}
