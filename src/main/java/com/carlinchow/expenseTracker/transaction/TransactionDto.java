package com.carlinchow.expenseTracker.transaction;

import com.carlinchow.expenseTracker.category.CategoryDto;
import com.carlinchow.expenseTracker.user.UserDto;

import java.time.LocalDate;

public interface TransactionDto {
    Long getId();
    LocalDate getDate();
    Float getAmount();
    String getDescription();
    UserDto getUser();
    String getTransactionType();
    CategoryDto getCategory();
}
