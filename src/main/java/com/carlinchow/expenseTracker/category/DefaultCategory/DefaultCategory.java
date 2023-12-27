package com.carlinchow.expenseTracker.category.DefaultCategory;

import com.carlinchow.expenseTracker.category.Category;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("DEFAULT")
public class DefaultCategory extends Category {

    public DefaultCategory() {}

    public DefaultCategory(String name) {
        super(name);
    }
}
