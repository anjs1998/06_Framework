package edu.kh.project.member.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.project.member.model.dto.Member;
import edu.kh.project.member.model.mapper.MemberMapper;
import lombok.extern.slf4j.Slf4j;

@Transactional(rollbackFor = Exception.class)
@Service //비즈니스로직 처리 역할 명시
@Slf4j 
public class MemberServiceImpl implements MemberService{
	
	// 등록된 Bean 중에서 MemberMapper와 같은 타입 or 상속관계인 Bean을 찾아
	// 의존성 주입(DI)
	@Autowired
	private MemberMapper mapper;
	
	// Bcrypt 암호화 객체 의존성 주입(DI) - SecurityConfig 참고
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	//로그인 서비스 
	@Override
	public Member login(Member inputMember) {
		
		//암호화 진행
		
		// bcrypt.encode(문자열) : 문자열을 암호화하여 반환
		String bcryptPassword = bcrypt.encode(inputMember.getMemberPw());
		log.debug("bcryptPassword : " + bcryptPassword);
		//bcrypt.matches(평문, 암호화) : 평문과 암호화가 일치하면 true, 아니면 false 반환
		Member loginMember = mapper.login(inputMember.getMemberEmail());
		
		if(loginMember == null) return null;
		
		//3. 입력받은 비밀번호(평문 : inputMember.getMemberPw()) 와
		// 암호화된 비밀번호(loginMember.getMemberPw())
		// 두 비밀번호가 일치하는지 확인 ( bcrypt.matches(평문, 암호화))
		if( !bcrypt.matches(inputMember.getMemberPw(), loginMember.getMemberPw()) ) {
			
			return null;
			
		}
		
		loginMember.setMemberPw(null);
		return loginMember;
	}
	//이메일 중복검사 서비스
	@Override
	public int checkEmail(String memberEmail) {
		// TODO Auto-generated method stub
		return mapper.checkEmail();
	}
}
