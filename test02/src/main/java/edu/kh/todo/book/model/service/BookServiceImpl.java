package edu.kh.todo.book.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.todo.book.model.dto.Book;
import edu.kh.todo.book.model.mapper.BookMapper;
@Service
@Transactional(rollbackFor = Exception.class)
public class BookServiceImpl implements BookService{
	
	@Autowired
	private BookMapper mapper;
	@Override
	public List<Book> selectAllList() {
		// TODO Auto-generated method stub
		return mapper.selectAllList();
	}
	
}
