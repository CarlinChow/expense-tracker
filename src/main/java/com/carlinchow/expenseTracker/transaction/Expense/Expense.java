package com.carlinchow.expenseTracker.transaction.Expense;

import com.carlinchow.expenseTracker.category.Category;
import com.carlinchow.expenseTracker.transaction.Transaction;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@DiscriminatorValue("EXPENSE")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class Expense extends Transaction {
    private @ManyToOne @JoinColumn(name="category_id") Category category;
}
