package edu.kh.todo.book.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.todo.book.model.dto.Book;
@Mapper
public interface BookMapper {

	public List<Book> selectAllList() ;
}
