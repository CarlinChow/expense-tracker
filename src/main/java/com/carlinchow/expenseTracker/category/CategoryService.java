package com.carlinchow.expenseTracker.category;

import com.carlinchow.expenseTracker.category.CustomCategory.CustomCategory;
import com.carlinchow.expenseTracker.category.CustomCategory.CustomCategoryRepository;
import com.carlinchow.expenseTracker.user.User;
import com.carlinchow.expenseTracker.category.DefaultCategory.DefaultCategoryRepository;
import com.carlinchow.expenseTracker.user.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

@Transactional
@Service
public class CategoryService {
    private final DefaultCategoryRepository defaultCategoryRepository;
    private final CustomCategoryRepository customCategoryRepository;
    private final UserService userService;

    @Autowired
    public CategoryService(DefaultCategoryRepository defaultCategoryRepository, CustomCategoryRepository customCategoryRepository, UserService userService) {
        this.defaultCategoryRepository = defaultCategoryRepository;
        this.customCategoryRepository = customCategoryRepository;
        this.userService = userService;
    }

    public List<CategoryDTO> getCategories(Long id) {
        List<CategoryDTO> defaultCategories = defaultCategoryRepository.findAllCategoryDTO();
        List<CategoryDTO> customCategories = customCategoryRepository.findAllCategoryDTOByUser(id);
        if(customCategories.size() > 0){
            return Stream.concat(defaultCategories.stream(), customCategories.stream()).toList();
        }
        return defaultCategories;
    }

    public void createCustomCategory(Category category, Long id) {
        Optional<User> optionalUser = this.userService.findById(id);
        if(optionalUser.isEmpty()){
            throw new IllegalArgumentException("user with id " + id + " does not exist");
        }
        CustomCategory customCategory = new CustomCategory(category.getName(), optionalUser.get());
        this.customCategoryRepository.save(customCategory);
    }

    public void deleteCustomCategory(Long categoryId, Long userId) {
        Optional<CustomCategory> optionalCategory = this.customCategoryRepository.findById(categoryId);
        if(optionalCategory.isEmpty()){
            throw new IllegalArgumentException("no such category with id " + categoryId + " exist");
        }
        if(!Objects.equals(optionalCategory.get().getUser().getId(), userId)){
            throw new IllegalArgumentException("User does not have permission to delete this category");
        }
        this.customCategoryRepository.deleteById(categoryId);
    }

    public void updateCustomCategory(Long categoryId, Long userId, String name) {
        Optional<CustomCategory> optionalCategory = this.customCategoryRepository.findById(categoryId);
        if(optionalCategory.isEmpty()){
            throw new IllegalArgumentException("no such category with id " + categoryId + " exist");
        }
        CustomCategory category = optionalCategory.get();
        if(!Objects.equals(category.getUser().getId(), userId)){
            throw new IllegalArgumentException("User does not have permission to update this category");
        }
        category.setName(name);
    }
}

