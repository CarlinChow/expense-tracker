package com.carlinchow.expenseTracker.transaction.Income;

import com.carlinchow.expenseTracker.transaction.Transaction;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@DiscriminatorValue("INCOME")
@NoArgsConstructor
@SuperBuilder
public class Income extends Transaction {
}
