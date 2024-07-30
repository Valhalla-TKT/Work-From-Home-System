package com.kage.wfhs.config;

import com.kage.wfhs.jwt.JwtUtil;
import com.kage.wfhs.jwt.JwtUtils;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class AppConfig {

    @Bean
    public JwtUtils jwtUtils(JwtUtil jwtUtil) {
        return new JwtUtils(jwtUtil);
    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("")
                        .allowCredentials(true);
            }
        };
    }

    @Bean
    public OpenAPI defineOpenApi() {
        Server server = new Server();
        server.setUrl("http://localhost:8080/wfhs");
        server.setDescription("Development");

        Contact myContact = new Contact();
        myContact.setName("WFHS");
        myContact.setEmail("wfhs-contact@gmail.com");

        Info information =
                new Info()
                        .title("Work From Home System API")
                        .version("1.0")
                        .description("This API exposes endpoints to manage Work From Home system.")
                        .contact(myContact);
        return new OpenAPI().info(information).servers(List.of(server));
    }
}