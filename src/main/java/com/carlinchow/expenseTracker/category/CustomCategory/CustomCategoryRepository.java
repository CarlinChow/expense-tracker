package com.carlinchow.expenseTracker.category.CustomCategory;

import com.carlinchow.expenseTracker.category.CategoryBaseRepository;
import com.carlinchow.expenseTracker.category.CategoryDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

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
}
