package com.jackyCode.ManagementSystem.todo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jackyCode.basic.auth.AuthenticationBean;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TodoJpaResource {
	
	@Autowired
	private TodoHardcodedService todoService;
	
	@Autowired
	private TodoJpaRepository todoJpaRepository;
	
	@GetMapping(path = "/jpa/helloworld/{name}")
	public AuthenticationBean WelcomeMessage(@PathVariable String name) {
		return new AuthenticationBean("Welcome to back, " + name);
	}
	
	@GetMapping("/jpa/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username) {
		return todoJpaRepository.findByUsername(username);
//		return todoService.findAll();
	}
	
	@GetMapping("/jpa/users/{username}/todos/{id}")
	public Todo getTodo(@PathVariable String username, @PathVariable long id) {
		
		if (todoJpaRepository.findById(id).isPresent()) {
			return todoJpaRepository.findById(id).get();
		}
		return null;
//		return todoService.findById(id);
	}
	
	@DeleteMapping("jpa/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable String username, @PathVariable long id) {
		Todo todo = todoJpaRepository.getById(id);
		if(todo != null) {
			todoJpaRepository.deleteById(id);
			return ResponseEntity.noContent().build();
		} 
		return ResponseEntity.notFound().build();
		
		
	}
	
	@PutMapping("jpa/users/{username}/todos/{id}")
	public ResponseEntity<Todo> editTodo(@PathVariable String username, @PathVariable long id, @RequestBody Todo todo) {
		todo.setUsername(username);
		Todo editTodo = todoJpaRepository.save(todo);
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
	}

	@PostMapping("jpa/users/{username}/todos")
	public ResponseEntity<String> newTodo(@PathVariable String username, @RequestBody Todo todo) {
		todo.setUsername(username);
		Todo newTodo = todoJpaRepository.save(todo);
		return new ResponseEntity<String>("Success new todo", HttpStatus.OK);
	}
	
}
