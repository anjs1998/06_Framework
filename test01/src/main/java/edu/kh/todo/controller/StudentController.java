package edu.kh.todo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestBody
public class StudentController {

	public String selectStudent(HttpServletRequest req, @ModelAttribute Student student) {
		req.setAttribute("stdName", student.getStdName());
		req.setAttribute("stdAge", student.getStdAge());
		req.setAttribute("stdAddress", student.getStdAddress());
		return "student/select";
	}
... 이하 생략
}