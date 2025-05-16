package edu.kh.todo.book.model.service;

import java.util.List;

import edu.kh.todo.book.model.dto.Book;

public interface BookService {

	List<Book> selectAllList();
	
}
