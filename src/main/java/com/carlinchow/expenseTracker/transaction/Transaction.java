package com.carlinchow.expenseTracker.transaction;

import com.carlinchow.expenseTracker.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="transaction_type")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Table(indexes = {@Index(name ="multi_idx_transaction", columnList = "user_id, date DESC, transaction_type")})
public class Transaction {

    @Setter(AccessLevel.NONE)
    private @Id @GeneratedValue Long id;

    private LocalDate date;

    private Float amount;

    private String description;

    private @ManyToOne @JoinColumn(name="user_id") User user;

    @Column(name = "transaction_type", insertable = false, updatable = false)
    @Setter(AccessLevel.NONE)
    private String transactionType;
}
