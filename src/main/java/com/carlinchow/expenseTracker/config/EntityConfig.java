package com.carlinchow.expenseTracker.config;

import com.carlinchow.expenseTracker.authentication.AuthenticationService;
import com.carlinchow.expenseTracker.authentication.RegisterRequest;
import com.carlinchow.expenseTracker.category.CustomCategory.CustomCategory;
import com.carlinchow.expenseTracker.category.CustomCategory.CustomCategoryRepository;
import com.carlinchow.expenseTracker.category.DefaultCategory.DefaultCategory;
import com.carlinchow.expenseTracker.category.DefaultCategory.DefaultCategoryRepository;
import com.carlinchow.expenseTracker.transaction.Expense.Expense;
import com.carlinchow.expenseTracker.transaction.Expense.ExpenseRepository;
import com.carlinchow.expenseTracker.transaction.Income.Income;
import com.carlinchow.expenseTracker.transaction.Income.IncomeRepository;
import com.carlinchow.expenseTracker.user.User;
import com.carlinchow.expenseTracker.user.UserRepository;
import com.carlinchow.expenseTracker.user.enums.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class EntityConfig {
    @Bean
    CommandLineRunner populateTables(
            UserRepository userRepository,
            DefaultCategoryRepository defaultCategoryRepository,
            CustomCategoryRepository customCategoryRepository,
            IncomeRepository incomeRepository,
            ExpenseRepository expenseRepository,
            AuthenticationService authenticationService
    ){
        return args -> {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            // create users
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

            // create categories
            DefaultCategory shopping = new DefaultCategory("shopping");
            DefaultCategory foodAndDining = new DefaultCategory("food & dining");
            DefaultCategory autoAndTransport = new DefaultCategory("auto & transport");
            DefaultCategory billsAndUtility = new DefaultCategory("bills & utility");
            defaultCategoryRepository.saveAll(List.of(shopping, foodAndDining,autoAndTransport, billsAndUtility));
            User john = userRepository.findByEmail("amychow@gmail.com").orElseThrow();
            User amy = userRepository.findByEmail("johnlam@gmail.com").orElseThrow();
            CustomCategory pet = new CustomCategory("pet", john);
            CustomCategory beauty = new CustomCategory("beauty", amy);
            customCategoryRepository.saveAll(List.of(pet, beauty));

            List<DefaultCategory> defaultCategories = defaultCategoryRepository.findAll();
            // create transactions
            var johnRent = Expense.builder()
                                    .date(LocalDate.now())
                                    .amount(1250f)
                                    .description("rent payment for september")
                                    .category(defaultCategories.get(3))
                                    .build();
            var johnLululemon = Expense.builder()
                    .date(LocalDate.of(2023, Month.DECEMBER, 25))
                    .amount(100.20f)
                    .description("Lululemon ABC Joggers")
                    .category(defaultCategories.get(0))
                    .user(john)
                    .build();
            var johnChristmasBonus = Income.builder()
                    .date(LocalDate.of(2023, Month.DECEMBER, 23))
                    .amount(3000f)
                    .description("bonus from work")
                    .user(john)
                    .build();
            expenseRepository.saveAll(List.of(johnRent, johnLululemon));
            incomeRepository.save(johnChristmasBonus);
        };
    }
}
