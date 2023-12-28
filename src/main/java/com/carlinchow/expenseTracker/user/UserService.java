package com.carlinchow.expenseTracker.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> getUsers(){
        return this.repository.findAll();
    }

    public void addUser(User user){
        if(this.repository.findOneByEmail(user.getEmail()).isPresent()){
            throw new IllegalStateException("email taken");
        }
        this.repository.save(user);
    }

    public void deleteUser(Long id) {
        if(this.repository.findById(id).isEmpty()){
            throw new IllegalStateException("User with id " + id + " does not exist");
        }
        this.repository.deleteById(id);
    }
}
