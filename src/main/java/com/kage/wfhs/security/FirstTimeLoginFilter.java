package com.kage.wfhs.security;

import com.kage.wfhs.dto.UserDto;
import com.kage.wfhs.dto.auth.CurrentLoginUserDto;
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
        if (requestURI.startsWith("/wfhs/static/") || requestURI.startsWith("/wfhs/assets/") ||
                requestURI.startsWith(request.getContextPath() + "/api/session/") || requestURI.startsWith("/wfhs/swagger-ui/") || requestURI.startsWith(request.getContextPath() + "/api/password/") ||
                requestURI.startsWith("/icons/") || requestURI.startsWith("/formImages/") ||
                requestURI.startsWith("/wfhs/images/") || requestURI.startsWith("/wfhs/ws/") ||
                requestURI.equals("/wfhs/login") || requestURI.equals("/wfhs/profile") || requestURI.equals("/wfhs/admin/importExcel")) {
            filterChain.doFilter(request, response);
            return;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            CurrentLoginUserDto userDto = (CurrentLoginUserDto) request.getSession().getAttribute("login-user");
            if (userDto == null) {
                logger.debug("Fetching user details from database for: " + authentication.getName());
                userDto = userService.getLoginUserBystaffId(authentication.getName());
                request.getSession().setAttribute("login-user", userDto);
            }

            if (userDto != null && userDto.isFirstTimeLogin()) {
                Set<String> roles = userDto.getApproveRoles().stream().map(ApproveRole::getName).collect(Collectors.toSet());
                if (roles.contains("HR")) {
                    logger.debug("Redirecting to /importExcel");
                    response.sendRedirect(request.getContextPath() + "/admin/importExcel");
                    return;
                } else  {
                    logger.debug("Redirecting to /profile");
                    response.sendRedirect(request.getContextPath() + "/profile");
                    return;
                }

            }
        }
        filterChain.doFilter(request, response);
    }
}
