package com.carlinchow.expenseTracker.category.DefaultCategory;

import com.carlinchow.expenseTracker.category.CategoryBaseRepository;
import com.carlinchow.expenseTracker.category.CategoryDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DefaultCategoryRepository extends CategoryBaseRepository<DefaultCategory> {

    @Query("""
            SELECT
                c.id AS id,
                c.name AS name,
                c.categoryType AS categoryType
            FROM
                DefaultCategory c
            """)
    List<CategoryDto> findAllCategoryDto();
}
