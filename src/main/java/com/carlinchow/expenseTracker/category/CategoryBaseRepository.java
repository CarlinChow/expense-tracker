package com.carlinchow.expenseTracker.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface CategoryBaseRepository<T extends Category> extends JpaRepository<T, Long> {
}
