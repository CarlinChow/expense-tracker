package com.carlinchow.expenseTracker.category.CustomCategory;

import com.carlinchow.expenseTracker.category.Category;
import com.carlinchow.expenseTracker.user.User;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@DiscriminatorValue("CUSTOM")
public class CustomCategory extends Category {
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne()
    @JoinColumn(name = "user_id")
    private User user;

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

