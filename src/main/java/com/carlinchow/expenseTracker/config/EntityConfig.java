package com.carlinchow.expenseTracker.config;

import com.carlinchow.expenseTracker.authentication.AuthenticationService;
import com.carlinchow.expenseTracker.authentication.RegisterRequest;
import com.carlinchow.expenseTracker.category.CustomCategory.CustomCategory;
import com.carlinchow.expenseTracker.category.CustomCategory.CustomCategoryRepository;
import com.carlinchow.expenseTracker.category.DefaultCategory.DefaultCategory;
import com.carlinchow.expenseTracker.category.DefaultCategory.DefaultCategoryRepository;
import com.carlinchow.expenseTracker.user.User;
import com.carlinchow.expenseTracker.user.UserRepository;
import com.carlinchow.expenseTracker.user.enums.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
public class EntityConfig {
    @Bean
    CommandLineRunner populateTables(
            UserRepository userRepository,
            DefaultCategoryRepository defaultCategoryRepository,
            CustomCategoryRepository customCategoryRepository,
            AuthenticationService authenticationService
    ){
        return args -> {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            var admin = User.builder()
                            .email("admin@gmail.com")
                            .password(passwordEncoder.encode("admin"))
                            .role(Role.ADMIN)
                            .build();
            var johnReg = RegisterRequest.builder()
                        .email("johnlam@gmail.com")
                        .password("mypants")
                        .build();
            var amyReg = RegisterRequest.builder()
                        .email("amychow@gmail.com")
                        .password("mypants")
                        .build();
            var markReg = RegisterRequest.builder()
                        .email("markjones@gmail.com")
                        .password("mypants")
                        .build();
            userRepository.save(admin);
            authenticationService.register(johnReg);
            authenticationService.register(amyReg);
            authenticationService.register(markReg);
            DefaultCategory shopping = new DefaultCategory("shopping");
            DefaultCategory foodAndDining = new DefaultCategory("food & dining");
            DefaultCategory autoAndTransport = new DefaultCategory("auto & transport");
            defaultCategoryRepository.saveAll(List.of(shopping, foodAndDining,autoAndTransport));
            User john = userRepository.findByEmail("amychow@gmail.com").orElseThrow();
            User amy = userRepository.findByEmail("johnlam@gmail.com").orElseThrow();
            CustomCategory pet = new CustomCategory("pet", john);
            CustomCategory beauty = new CustomCategory("beauty", amy);
            customCategoryRepository.saveAll(List.of(pet, beauty));
        };
    }
}
