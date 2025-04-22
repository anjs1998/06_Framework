package edu.kh.project.email.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.kh.project.email.model.service.EmailService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("email")
@RequiredArgsConstructor
public class EmailController {
	//@RequiredArgsConstructor 때문에 final문에 한해 @Autowired와 똑같은 효과를 낸다 
	private final EmailService service;
	
	@ResponseBody
	@PostMapping("signup")
	public int signup(@RequestBody String email/*{memberEmail : user01@kh...}을 넘겨주는 매개변수*/) {
		String authKey = service.sendEmail("signup", email);
		
		if(authKey != null) {
			return 1;
		}
		
		//이메일 보내기 실패 
		return 0;
		
	}
	
}
