/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.config;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
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

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .httpBasic(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/static/**", "/assets/**", "/swagger-ui/**", "/icons/**", "/formImages/**", "/images/**", "/ws/**").permitAll()
                        .anyRequest().authenticated()
                )
                .exceptionHandling(exceptionHandling -> exceptionHandling.accessDeniedPage("/accessDenied"))
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .formLogin(form -> form
                                .loginPage("/login")
                                .loginProcessingUrl("/signIn")
                                .defaultSuccessUrl("/dashboard")
                                .successHandler(
                                        (((request, response, authentication) -> {
                                        	String token = jwtUtil.generateToken(authentication.getName());
                                            Cookie cookie = new Cookie("JWT", token);
                                            cookie.setHttpOnly(true);
                                            cookie.setPath("/");
                                            cookie.setMaxAge(86400); // 1 day
                                            response.addCookie(cookie);
                                            response.sendRedirect("/dashboard");
                                        }))
                                )
                                .failureHandler(authenticationFailureHandler())
                                .permitAll()
                ).logout(
                        logout -> logout
                                .logoutUrl("/signOut")
                                .logoutSuccessUrl("/login")
                                .logoutSuccessHandler(
                                        (((request, response, authentication) -> {
                                            Cookie cookie = new Cookie("JWT", null);
                                            cookie.setHttpOnly(true);
                                            cookie.setPath("/");
                                            cookie.setMaxAge(0);
                                            response.addCookie(cookie);                                
                                            response.sendRedirect("/login");
                                        }))
                                )
                                .invalidateHttpSession(true)
                                .permitAll()
                );
        return http.build();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public UserDetailsService userDetailsService(){
        return new OurUserDetailService();
    }

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return (request, response, authException) -> {
            response.sendRedirect("/login");
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
            String errorMessage = "Incorrect username or password.";
            request.getSession().setAttribute("errorMessage", errorMessage);
            response.sendRedirect("/login?error");
        };
    }
}