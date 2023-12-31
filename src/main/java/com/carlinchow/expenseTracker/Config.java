package com.carlinchow.expenseTracker;

import com.carlinchow.expenseTracker.category.CustomCategory.CustomCategory;
import com.carlinchow.expenseTracker.category.CustomCategory.CustomCategoryRepository;
import com.carlinchow.expenseTracker.category.DefaultCategory.DefaultCategory;
import com.carlinchow.expenseTracker.category.DefaultCategory.DefaultCategoryRepository;
import com.carlinchow.expenseTracker.user.User;
import com.carlinchow.expenseTracker.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Optional;

@Configuration
public class Config {
    @Bean
    CommandLineRunner populateTables(
            UserRepository userRepository,
            DefaultCategoryRepository defaultCategoryRepository,
            CustomCategoryRepository customCategoryRepository){
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
            DefaultCategory shopping = new DefaultCategory("shopping");
            DefaultCategory foodAndDining = new DefaultCategory("food & dining");
            DefaultCategory autoAndTransport = new DefaultCategory("auto & transport");
            defaultCategoryRepository.saveAll(List.of(shopping, foodAndDining,autoAndTransport));
            Optional<User> optJohn = userRepository.findById(1L);
            Optional<User> optAmy = userRepository.findById(2L);
            if(optJohn.isPresent()){
                CustomCategory pet = new CustomCategory("pet", optJohn.get());
                customCategoryRepository.save(pet);
            }
            if(optAmy.isPresent()){
                CustomCategory beauty = new CustomCategory("beauty", optAmy.get());
                customCategoryRepository.save(beauty);
            }
        };
    }
}
