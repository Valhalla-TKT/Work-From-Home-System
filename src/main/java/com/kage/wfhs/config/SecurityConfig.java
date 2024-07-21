/*
 * @Author       : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date         : 2024-04-24
 * @Time         : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.config;

import com.kage.wfhs.dto.UserDto;
import com.kage.wfhs.dto.auth.CurrentLoginUserDto;
import com.kage.wfhs.security.FirstTimeLoginFilter;
import com.kage.wfhs.service.UserService;
import com.kage.wfhs.util.LogService;
import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.kage.wfhs.security.JwtAuthenticationFilter;
import com.kage.wfhs.security.OurUserDetailService;
import com.kage.wfhs.util.JwtUtil;

import jakarta.servlet.http.Cookie;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final OurUserDetailService userDetailService;
    private final JwtUtil jwtUtil;
    private final FirstTimeLoginFilter firstTimeLoginFilter;
    private final UserService userService;
    private final LogService logService;

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .httpBasic(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/static/**", "/assets/**", "/swagger-ui/**", "/icons/**", "/formImages/**", "/images/**", "/ws/**", "/auth/**").permitAll()
                        .requestMatchers("/admin/**").access((authentication, context) -> {
                            Authentication authen = authentication.get();
                            boolean isApplicant = authen.getAuthorities().stream()
                                    .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("APPLICANT"));
                            return isApplicant ? new org.springframework.security.authorization.AuthorizationDecision(false)
                                    : new org.springframework.security.authorization.AuthorizationDecision(true);
                        })
                        .anyRequest().authenticated()
                )
                .exceptionHandling(exceptionHandling -> exceptionHandling.accessDeniedPage("/accessDenied"))
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterAfter(firstTimeLoginFilter, JwtAuthenticationFilter.class)
                .formLogin(form -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/signIn")
                        .defaultSuccessUrl("/dashboard")
                        .successHandler(
                                (request, response, authentication) -> {
                                    String contextPath = request.getContextPath();
                                    String token = jwtUtil.generateToken(authentication.getName());
                                    Cookie cookie = new Cookie("JWT", token);
                                    cookie.setHttpOnly(true);
                                    cookie.setPath(contextPath + "/");
                                    cookie.setMaxAge(86400); // 1 day
                                    response.addCookie(cookie);
                                    CurrentLoginUserDto userDto = userService.getLoginUserBystaffId(authentication.getName());
                                    request.getSession().setAttribute("login-user", userDto);
//                                    String logMessage = String.format("User logged in: Staff ID=%s, Name=%s, Team Name=%s",
//                                            userDto.getStaffId(), userDto.getName(),
//                                            userDto.getTeam() != null ? userDto.getTeam().getName() : "No Team");
//                                    logger.info(logMessage);
//                                    writeLoginLog(logMessage);
                                    String deviceInfo = request.getParameter("deviceInfo");
                                    logService.logUserLogin(userDto, deviceInfo);
                                    response.sendRedirect(contextPath + "/dashboard");
                                })
                        .failureHandler(authenticationFailureHandler())
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/signOut")
                        .logoutSuccessUrl("/login")
                        .logoutSuccessHandler(
                                (request, response, authentication) -> {
                                    String contextPath = request.getContextPath();
                                    Cookie cookie = new Cookie("JWT", null);
                                    cookie.setHttpOnly(true);
                                    cookie.setPath(contextPath + "/");
                                    cookie.setMaxAge(0);
                                    response.addCookie(cookie);
                                    response.sendRedirect(contextPath + "/login");
                                })
                        .invalidateHttpSession(true)
                        .permitAll()
                );
        return http.build();
    }

//    private void writeLoginLog(String logMessage) {
//        try (BufferedWriter writer = new BufferedWriter(new FileWriter(LOGIN_LOG_FILE, true))) {
//            writer.write(logMessage);
//            writer.newLine();
//        } catch (IOException e) {
//            logger.error("Error writing login log: ", e);
//        }
//    }
//
//    public void logUserLogin(CurrentLoginUserDto userDto) {
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//        String currentTime = LocalDateTime.now().format(formatter);
//
//        String logMessage = String.format("User logged in at %s: Staff ID=%s, Name=%s, Team Name=%s, Department Name=%s, Division Name=%s",
//                currentTime,
//                userDto.getStaffId(),
//                userDto.getName(),
//                userDto.getTeam() != null ? userDto.getTeam().getName() : "No Team",
//                userDto.getDepartment() != null ? userDto.getDepartment().getName() : "No Department",
//                userDto.getDepartment() != null ? userDto.getDivision().getName() : "No Division");
//
//        logger.info(logMessage);
//        writeLoginLog(logMessage);
//    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new OurUserDetailService();
    }

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return (request, response, authException) -> {
            String contextPath = request.getContextPath();
            response.sendRedirect(contextPath + "/login");
        };
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return (request, response, exception) -> {
            String errorMessage = "Incorrect Staff ID or Password.";
            request.getSession().setAttribute("errorMessage", errorMessage);
            String contextPath = request.getContextPath();
            response.sendRedirect(contextPath + "/login?error");
        };
    }
}
