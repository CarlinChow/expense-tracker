package com.carlinchow.expenseTracker.transaction.Expense;

import com.carlinchow.expenseTracker.transaction.TransactionBaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends TransactionBaseRepository<Expense> {

}
