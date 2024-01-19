package com.carlinchow.expenseTracker.transaction;

import com.carlinchow.expenseTracker.transaction.Expense.ExpenseRequestDto;
import com.carlinchow.expenseTracker.transaction.Income.IncomeRequestDto;
import com.carlinchow.expenseTracker.user.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
    private final TransactionService service;

    @Autowired
    public TransactionController(TransactionService service){
        this.service = service;
    }

    // add more configurability with get transaction request, ie. paging, sorting etc
    @GetMapping
    public List<TransactionDto> getAllTransactions(@RequestParam(required = false) Integer month, @RequestParam(required = false) Integer year,  @AuthenticationPrincipal User user){
        if(month != null && year != null){
            return this.service.getAllTransactionsByMonth(month, year, user);
        }
        return this.service.getAllTransactions(user);
    }

    @PostMapping("/income")
    public ResponseEntity<Void> createIncome(@Valid @RequestBody IncomeRequestDto income, @AuthenticationPrincipal User user){
        this.service.createIncome(income, user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/expense")
    public ResponseEntity<Void> createExpense(@Valid @RequestBody ExpenseRequestDto expense, @AuthenticationPrincipal User user){
        this.service.createExpense(expense, user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id, @AuthenticationPrincipal User user){
        this.service.deleteTransaction(id, user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/income/{id}")
    public void updateIncome(@PathVariable Long id, @RequestBody IncomeRequestDto income, @AuthenticationPrincipal User user){
        this.service.updateIncome(id, income.getDate(), income.getAmount(), income.getDescription(), user);
    }

    @PutMapping("/expense/{id}")
    public void updateExpense(@PathVariable Long id, @RequestBody ExpenseRequestDto expense, @AuthenticationPrincipal User user){   
        this.service.updateExpense(id, 
            expense.getDate(), 
            expense.getAmount(), 
            expense.getDescription(), 
            expense.getCategory(), 
            user);
    }
}
