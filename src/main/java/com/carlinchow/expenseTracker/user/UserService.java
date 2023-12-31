package com.carlinchow.expenseTracker.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Optional<User> findById(Long id) { return this.repository.findById(id); }

    public void addUser(User user){
        if(this.repository.findByEmail(user.getEmail()).isPresent()){
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
