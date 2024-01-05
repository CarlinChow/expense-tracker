package com.carlinchow.expenseTracker.category;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "category_type")
@Table(indexes = {@Index(name = "multi_idx_category", columnList = "category_type, user_id")})
public class Category {
    private @Id @GeneratedValue Long id;
    private String name;
    @Column(name = "category_type", insertable = false, updatable = false)
    private String categoryType;

    public Category() {}

    public Category(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategoryType() {
        return this.categoryType;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}


