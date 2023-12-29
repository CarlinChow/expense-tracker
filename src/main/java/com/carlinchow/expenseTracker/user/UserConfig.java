package com.carlinchow.expenseTracker.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository){
        return args -> {
            User john = new User(
                    "johnlam@gmail.com",
                    "mypants"
            );
            User amy = new User(
                    "amychow@gmail.com",
                    "secretpassword"
            );
            User mark = new User(
                    "markjones@gmail.com",
                    "spaghetti"
            );
            userRepository.saveAll(List.of(john, amy, mark));
        };
    }
}
