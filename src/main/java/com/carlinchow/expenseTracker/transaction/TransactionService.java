package com.carlinchow.expenseTracker.transaction;

import com.carlinchow.expenseTracker.category.Category;
import com.carlinchow.expenseTracker.transaction.Expense.Expense;
import com.carlinchow.expenseTracker.transaction.Expense.ExpenseRepository;
import com.carlinchow.expenseTracker.transaction.Expense.ExpenseRequestDto;
import com.carlinchow.expenseTracker.transaction.Income.Income;
import com.carlinchow.expenseTracker.transaction.Income.IncomeRepository;
import com.carlinchow.expenseTracker.transaction.Income.IncomeRequestDto;
import com.carlinchow.expenseTracker.user.User;
import com.carlinchow.expenseTracker.user.enums.Role;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, IncomeRepository incomeRepository, ExpenseRepository expenseRepository) {
        this.transactionRepository = transactionRepository;
        this.incomeRepository = incomeRepository;
        this.expenseRepository = expenseRepository;
    }

    public List<TransactionDto> getAllTransactions(User user) {
        return this.transactionRepository.findAllByUserOrderByDateDesc(user);
    }

    public List<TransactionDto> getAllTransactionsByMonth(int month, int year, User user) {
        return this.transactionRepository.findAllByUserAndMonthAndYearOrderByDateAsc(month, year, user);
    }

    public void createIncome(IncomeRequestDto incomeReq, User user) {
        var income = Income.builder()
                .user(user)
                .date(incomeReq.getDate())
                .amount(incomeReq.getAmount())
                .description(incomeReq.getDescription())
                .build();
        this.incomeRepository.save(income);
    }

    public void createExpense(ExpenseRequestDto expenseReq, User user) {
        var expense = Expense.builder()
                .user(user)
                .date(expenseReq.getDate())
                .amount(expenseReq.getAmount())
                .description(expenseReq.getDescription())
                .category(expenseReq.getCategory())
                .build();
        this.expenseRepository.save(expense);
    }

    public void deleteTransaction(Long id, User user) {
        Optional<Transaction> optTransaction = this.transactionRepository.findById(id);
        if(optTransaction.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction with id: " + id + " does not exist");
        }
        Transaction transaction = optTransaction.get();
        if(!transaction.getUser().equals(user) && user.getRole().equals(Role.USER)){ // allows admin to delete any transaction
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User does not have authorization to delete this transaction");
        }
        this.transactionRepository.deleteById(id);
    }

    public void updateIncome(Long id, LocalDate date, Float amount, String description, User user) {
        Optional<Income> optIncome = this.incomeRepository.findById(id);
        if(optIncome.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction with id: " + id + " does not exist");
        }
        Income income = optIncome.get();
        if(!income.getUser().equals(user)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User does not have authorization to delete this transaction");
        }
        if(date != null){
            income.setDate(date);
        }
        if(amount != null){
            income.setAmount(amount);
        }
        if(description != null){
            income.setDescription(description);
        }
    }

    public void updateExpense(Long id, LocalDate date, Float amount, String description, Category category, User user) {
        Optional<Expense> optExpense = this.expenseRepository.findById(id);
        if(optExpense.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction with id: " + id + " does not exist");
        }
        Expense expense = optExpense.get();
        if(!expense.getUser().equals(user)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User does not have authorization to delete this transaction");
        }
        if(date != null){
            expense.setDate(date);
        }
        if(amount != null){
            expense.setAmount(amount);
        }
        if(description != null){
            expense.setDescription(description);
        }
        if(category != null){
            expense.setCategory(category);
        }
    }
}
