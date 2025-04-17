package edu.kh.todo.model.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.kh.todo.model.mapper.TodoMapper;

@Repository // DAO 계층 역할 명시 + Bean 등록
public class TodoDAO {
	@Autowired // new TodoMapper() 안만들고, 대신 이걸 쓴다! ::** 의존성 주입(DI)** 
	// -> 같은 타입 + 상속관계 Bean을 의존성 주입
	private TodoMapper mapper; // mapper에는 TodoMapper의 구현제가 의존성 주입됨
	//그 구현체가 sqlSessionTemplate 이용

	public String testTitle() {
		// 결과 저장용변수 선언 - 안해도 됨!
		// SQL 작성 - 안해도 됨!
		// Pstmt / ResultSet 등 객체 생성/ 세팅/ 사용 - 안해도 됨!
		// 결과값 얻어온것 가공 - 안해도 됨!
		return mapper.testTitle();
	}
	
}
// 마이바티스에서 @Mapper 만 사용 -> 가장 흔함

// 마이바티스에서 @Mapper + @Repository -> 자주 사용하지 않으나 가능

// @Repository -> 불가능

// 