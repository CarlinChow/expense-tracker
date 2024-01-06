package com.carlinchow.expenseTracker.category;

import com.carlinchow.expenseTracker.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/category")
public class CategoryController {
    private final CategoryService service;

    @Autowired
    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<CategoryDto> getCategories(@AuthenticationPrincipal User user) {
        return this.service.getCategories(user.getId());
    }

    @PostMapping
    public void postCategory(@RequestBody Category category, @AuthenticationPrincipal User user){
        this.service.createCustomCategory(category, user);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteCategory(@PathVariable("id") Long categoryId, @AuthenticationPrincipal User user){
        this.service.deleteCustomCategory(categoryId, user.getId());
    }

    @PutMapping(path = "/{id}")
    public void updateCategory(@PathVariable("id") Long categoryId, @RequestParam String name, @AuthenticationPrincipal User user){
        this.service.updateCustomCategory(categoryId, user.getId(), name);
    }
}
