package com.carlinchow.expenseTracker.transaction.Expense;

import com.carlinchow.expenseTracker.category.Category;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@AllArgsConstructor
public class ExpenseRequestDto {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "date field required")
    private LocalDate date;

    @NotNull(message = "amount field required")
    private Float amount;

    @NotNull(message = "description field required")
    private String description;

    @NotNull(message = "category field cannot be null")
    private Category category;
}
