/*
 * @Author 		 : Valhalla TKT (DAT OJT Batch II - Team III)
 * @Date 		 : 2024-04-24
 * @Time  		 : 21:00
 * @Project_Name : Work From Home System
 * @Contact      : tktvalhalla@gmail.com
 */
package com.kage.wfhs.config;
// for only development purpose, this class can remove
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class OpenAPIConfiguration {

  @Bean
  public OpenAPI defineOpenApi() {
    Server server = new Server();
    server.setUrl("http://localhost:8081");
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
