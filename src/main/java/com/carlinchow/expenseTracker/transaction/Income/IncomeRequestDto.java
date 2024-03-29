package com.carlinchow.expenseTracker.transaction.Income;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

@Getter
@AllArgsConstructor
public class IncomeRequestDto {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "date field required")
    private LocalDate date;

    @NotNull(message = "amount field required")
    private Float amount;

    @NotNull(message = "description field cannot be null")
    private String description;
}
