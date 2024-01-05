package com.carlinchow.expenseTracker.transaction.Expense;

import com.carlinchow.expenseTracker.category.Category;
import com.carlinchow.expenseTracker.transaction.Transaction;
import com.carlinchow.expenseTracker.user.User;
import jakarta.persistence.*;
import lombok.Builder;

import java.time.LocalDate;

@Entity
@DiscriminatorValue("EXPENSE")
@Builder
public class Expense extends Transaction {
    private @ManyToOne @JoinColumn(name="category_id") Category category;

    public Expense() { super(); }

    public Expense(LocalDate date, Float amount, String description, User user, Category category) {
        super(date, amount, description, user);
        this.category = category;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
