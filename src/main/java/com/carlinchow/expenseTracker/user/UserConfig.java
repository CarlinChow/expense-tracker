package com.carlinchow.expenseTracker.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository){
        return args -> {
            System.out.println("RUNNING MY USER CONFIG");
            User john = new User(
                    "johnlam@gmail.com",
                    "mypants"
            );
            userRepository.save(john);
        };
    }
}
