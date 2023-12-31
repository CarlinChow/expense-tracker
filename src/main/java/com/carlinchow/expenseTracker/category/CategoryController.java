package com.carlinchow.expenseTracker.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/category")
public class CategoryController {
    private final CategoryService service;

    @Autowired
    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<CategoryDTO> getCategories(@RequestHeader(value = "user-id", required = false) Long id) {
        return this.service.getCategories(id);
    }

    @PostMapping
    public void postCategory(@RequestBody Category category, @RequestHeader("user-id") Long id){
        this.service.createCustomCategory(category, id);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteCategory(@PathVariable("id") Long categoryId, @RequestHeader("user-id") Long id){
        this.service.deleteCustomCategory(categoryId, id);
    }

    @PutMapping(path = "/{id}")
    public void updateCategory(@PathVariable("id") Long categoryId, @RequestHeader("user-id") Long id, @RequestParam String name){
        this.service.updateCustomCategory(categoryId, id, name);
    }
}
