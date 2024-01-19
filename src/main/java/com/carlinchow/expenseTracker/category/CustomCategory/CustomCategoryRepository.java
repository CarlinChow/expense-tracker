package com.carlinchow.expenseTracker.category.CustomCategory;

import com.carlinchow.expenseTracker.category.CategoryBaseRepository;
import com.carlinchow.expenseTracker.category.CategoryDto;
import com.carlinchow.expenseTracker.user.User;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomCategoryRepository extends CategoryBaseRepository<CustomCategory> {

    @Query("""
            SELECT
                c.id AS id,
                c.name AS name,
                c.categoryType AS categoryType
            FROM
                CustomCategory c
                INNER JOIN
                c.user u
            WHERE
                u.id = :id
           """)
    List<CategoryDto> findAllCategoryDtoByUser(Long id);

    Optional<CustomCategory> findByNameAndUser(String name, User user);
}
