package edu.kh.project.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


/*
 * @Configureation
 * - 해당 클래스가 설정용 클래스임을 명시
 * + 객체로 생성해서 내부 코드를 서버 실행시 모두 수행
 * 
 * @Bean
 * - 개발자가 수동으로 생성한 객체의 관리를
 * 스프링에게 넘기는 어노테이션(Bean 등록)
 * 
 * */
@Configuration
public class SecurityConfig {
	
	@Bean //return값 new BCryptPasswordEncoder()를 bean으로
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
