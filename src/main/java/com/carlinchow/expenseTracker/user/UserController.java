package com.carlinchow.expenseTracker.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/user")
public class UserController {
    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> getUsers(){
        return this.service.getUsers();
    }

    @PostMapping
    public void adduser(@RequestBody User user){
        this.service.addUser(user);
    }

    @DeleteMapping(path = "{userId}")
    public void deleteUser(@PathVariable("userId") Long id){
        this.service.deleteUser(id);
    }
}
