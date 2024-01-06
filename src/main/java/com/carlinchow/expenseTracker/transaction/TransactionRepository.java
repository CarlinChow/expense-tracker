package com.carlinchow.expenseTracker.transaction;

import com.carlinchow.expenseTracker.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("""
            SELECT
                t.id AS id,
                t.date AS date,
                t.amount AS amount,
                t.description AS description,
                t.user AS user,
                t.transactionType AS transactionType,
                t.category AS category
            FROM
                Transaction t
                INNER JOIN
                t.user u
                LEFT JOIN
                t.category c
            WHERE
                u.id = :#{#user.id}
            ORDER BY
                t.date DESC
           """)
    List<TransactionDto> findAllByUserOrderByDateDesc(User user);
}
