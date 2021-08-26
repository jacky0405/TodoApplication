package com.jackyCode.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class BasicAuthenticationController {
	
	@GetMapping(path = "/basicauth")
	public AuthenticationBean authenticationBean() {
		return new AuthenticationBean("You are authenticated.");
	}
	
	@GetMapping(path = "helloworld/{name}")
	public AuthenticationBean WelcomeMessage(@PathVariable String name) {
		return new AuthenticationBean("Welcome to back, " + name);
	}
	

}
