package com.carlinchow.expenseTracker.transaction.Income;

import com.carlinchow.expenseTracker.transaction.Transaction;
import com.carlinchow.expenseTracker.user.User;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

@Entity
@DiscriminatorValue("INCOME")
public class Income extends Transaction {
    public Income() { super(); }

    public Income(LocalDate date, Float amount, String description, User user) {
        super(date, amount, description, user);
    }
}
