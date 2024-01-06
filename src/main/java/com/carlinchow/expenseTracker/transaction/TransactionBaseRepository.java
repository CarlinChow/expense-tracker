package com.carlinchow.expenseTracker.transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface TransactionBaseRepository<T extends Transaction> extends JpaRepository<T, Long> {
}
