package com.carlinchow.expenseTracker.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Transactional
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

    public boolean userExists(Long id){
        return(this.repository.findById(id).isPresent());
    }

    public Optional<User> findById(Long id) {
        return this.repository.findById(id);
    }

    public Optional<User> findByEmail(String email){
        return this.repository.findByEmail(email);
    }

    public void addUser(User user){
        if(this.repository.findByEmail(user.getEmail()).isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "A user with email: " + user.getEmail() + " already exists");
        }
        this.repository.save(user);
    }

    public void deleteUser(Long id) {
        if(this.repository.findById(id).isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with id: " + id + " does not exist");
        }
        this.repository.deleteById(id);
    }
}
