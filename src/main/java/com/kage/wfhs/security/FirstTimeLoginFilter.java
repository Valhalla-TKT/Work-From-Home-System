package com.kage.wfhs.security;

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
        String contextPath = request.getContextPath();
        String requestURI = request.getRequestURI();
        String relativeURI = requestURI.substring(contextPath.length());
        String clientIP = getClientIpAddress(request);

        logger.debug("Request URI: {} from IP: {}", requestURI, clientIP);

        // Allow requests to static resources and specific endpoints
        if (relativeURI.startsWith("/static/") ||
                relativeURI.startsWith("/assets/") ||
                relativeURI.startsWith("/api/session/") ||
                relativeURI.startsWith("/swagger-ui/") ||
                relativeURI.startsWith("/api/password/") ||
                relativeURI.startsWith("/icons/") ||
                relativeURI.startsWith("/formImages/") ||
                relativeURI.startsWith("/images/") ||
                relativeURI.startsWith("/ws/") ||
                relativeURI.equals("/login") ||
                relativeURI.equals("/profile") ||
                relativeURI.equals("/admin/importExcel") ||
                relativeURI.equals("/api/importExcel")) {
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
                if ("00-00001".equals(userDto.getStaffId())) {
                    logger.debug("Redirecting to /admin/importExcel");
                    response.sendRedirect(contextPath + "/admin/importExcel");
                    return;
                } else {
                    logger.debug("Redirecting to /profile");
                    response.sendRedirect(contextPath + "/profile");
                    return;
                }
            }
        }
        filterChain.doFilter(request, response);
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String remoteAddr = "";

        if (request != null) {
            remoteAddr = request.getHeader("X-Forwarded-For");
            if (remoteAddr == null || remoteAddr.isEmpty()) {
                remoteAddr = request.getRemoteAddr();
            }
        }

        return remoteAddr;
    }
}
