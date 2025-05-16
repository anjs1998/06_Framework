package edu.kh.project.board.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import edu.kh.project.board.model.dto.Comment;
import edu.kh.project.board.model.mapper.CommentMapper;

@Service
@Transactional(rollbackFor=Exception.class)
public class CommentServiceImpl implements CommentService{

	
	@Autowired
	private CommentMapper mapper;
	
	@Override
	public List<Comment> select(int boardNo) {
		// List<Comment> (Java의 자료형 List)
		// HttpMessageConverter가 
		// List -> JSON(문자열)로 변환해서 응답 -> JS
		
		return mapper.select(boardNo);
	}

	@Override
	public int insert(Comment comment) {
		// TODO Auto-generated method stub
		return mapper.insert(comment);
	}

	@Override
	public int delete(int commentNo) {
		// TODO Auto-generated method stub
		return mapper.delete(commentNo);
	}

	@Override
	public int update(Comment comment) {
		// TODO Auto-generated method stub
		return mapper.update(comment);
	}
	

	
	

}
