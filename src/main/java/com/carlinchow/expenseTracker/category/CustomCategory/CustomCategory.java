package com.carlinchow.expenseTracker.category.CustomCategory;

import com.carlinchow.expenseTracker.category.Category;
import com.carlinchow.expenseTracker.user.User;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@DiscriminatorValue("CUSTOM")
public class CustomCategory extends Category {
    private @ManyToOne @JoinColumn(name = "user_id") User user;

    public CustomCategory() { super(); }

    public CustomCategory(String name, User user) {
        super(name);
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
