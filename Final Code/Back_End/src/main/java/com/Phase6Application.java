package com;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.Service.AdminService;
import com.bean.Admin;

@SpringBootApplication
@EnableJpaRepositories(basePackages="com.repository")
@EntityScan("com.bean")
@CrossOrigin


public class Phase6Application {

	public static void main(String[] args) {
		SpringApplication.run(Phase6Application.class, args);
		
		
//		AdminService as= new AdminService();
//				 
//		 as.createAdmin("Mr.Sailesh", "Chowdary", Long.parseLong("9989762736"), "admin@somethingcomplex!", "admin@gmail.com");
		
		
		
		
	}

}
