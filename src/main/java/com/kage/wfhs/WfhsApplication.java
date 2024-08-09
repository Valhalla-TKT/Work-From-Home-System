/*
 * @Author : Valhalla TKT (DAT OJT Batch III)
 * @Date : 4/24/2024
 * @Time : 9:00 PM
 * @Project_Name : Work From Home System
 */
package com.kage.wfhs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class WfhsApplication extends SpringBootServletInitializer {
	
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(WfhsApplication.class);
    }

	public static void main(String[] args) {
		long startTime = System.currentTimeMillis();
		SpringApplication.run(WfhsApplication.class, args);
		long endTime = System.currentTimeMillis();
        double startupTimeSeconds = (endTime - startTime) / 1000.0;
        System.out.printf("Started WfhsApplication in %.3f seconds%n", startupTimeSeconds);
	}

}
