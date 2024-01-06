package com.carlinchow.expenseTracker.transaction;

import com.carlinchow.expenseTracker.category.Category;
import com.carlinchow.expenseTracker.transaction.Expense.ExpenseRequestDto;
import com.carlinchow.expenseTracker.transaction.Income.IncomeRequestDto;
import com.carlinchow.expenseTracker.user.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    public List<TransactionDto> getAllTransactions(@AuthenticationPrincipal User user){
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
    public void updateIncome(@PathVariable Long id,
            @RequestParam(required = false)
            @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
            @RequestParam(required = false) Float amount,
            @RequestParam(required = false) String description,
            @AuthenticationPrincipal User user){
        this.service.updateIncome(id, date, amount, description, user);
    }

    @PutMapping("/expense/{id}")
    public void updateExpense(@PathVariable Long id,
                             @RequestParam(required = false) LocalDate date,
                             @RequestParam(required = false) Float amount,
                             @RequestParam(required = false) String description,
                             @RequestParam(required = false) Category category,
                             @AuthenticationPrincipal User user){
        this.service.updateExpense(id, date, amount, description, category, user);
    }
}
