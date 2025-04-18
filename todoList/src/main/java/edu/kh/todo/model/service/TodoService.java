package edu.kh.todo.model.service;

import java.util.List;
import java.util.Map;

import edu.kh.todo.model.dto.Todo;

public interface TodoService {
	/** (TEST) todoNo가 1인 할 일 제목 조회
	 * @return title;
	 * 
	 * 
	 * */
	String testTitle();

	
	/**
	 * 할 일 목록 + 완료된 할 일 갯수 조회
	 * @return Map;
	 * 
	 * **/
	Map<String, Object> selectAll();

	/**
	 * 할일 추가
	 * 
	 * 
	 * 
	 * */
	int addTodo(String todoTitle, String todoContent);

	/** 할 일 상세조회
	 * @param todoNo
	 * @return todo
	 * 
	 * 
	 * */
	Todo todoDetail(int todoNo);


	int changeComplete(Todo todo);

/**@param todo
 * @return int*/
	int todoUpdate(Todo todo);


	int todoDelete(Todo todo);

	/**전체 할 일 개수 조회
	 * @return totalCount
	 * */
	int getTotalCount();

	/** 완료된 할 일 개수 조회
	 * @return completeCount()
	 * 
	 * */
	int getCompleteCount();

	/** 할일 목록 조회
	 * @return todoList
	 * */
	List<Todo> selectList();

}
