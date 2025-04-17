package edu.kh.todo.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Getter + Setter + ToString
@NoArgsConstructor
@AllArgsConstructor
public class Todo {
	//DB내 TABLE의 내장 변수들을 camelCase로 바꿔서 이식
	
	private int todoNo;			//할 일 번호
	private String todoTitle;	//할 일 제목
	private String todoContent;	//할 일 내용
	private String complete;	//할 일 완료여부("Y", "N")
	private String regDate;		//할 일 등록일

}//mybatis.xml에서 db와 컬럼명 table명을 맞춰준다.<setting name="mapUnderscoreToCamelCase" value="true"/>
