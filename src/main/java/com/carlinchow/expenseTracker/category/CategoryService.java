package com.carlinchow.expenseTracker.category;

import com.carlinchow.expenseTracker.category.CustomCategory.CustomCategory;
import com.carlinchow.expenseTracker.category.CustomCategory.CustomCategoryRepository;
import com.carlinchow.expenseTracker.user.User;
import com.carlinchow.expenseTracker.category.DefaultCategory.DefaultCategoryRepository;
import com.carlinchow.expenseTracker.user.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

@Transactional
@Service
public class CategoryService {
    private final DefaultCategoryRepository defaultCategoryRepository;
    private final CustomCategoryRepository customCategoryRepository;

    @Autowired
    public CategoryService(DefaultCategoryRepository defaultCategoryRepository, CustomCategoryRepository customCategoryRepository, UserService userService) {
        this.defaultCategoryRepository = defaultCategoryRepository;
        this.customCategoryRepository = customCategoryRepository;
    }

    public List<CategoryDto> getCategories(Long id) {
        List<CategoryDto> defaultCategories = defaultCategoryRepository.findAllCategoryDto();
        List<CategoryDto> customCategories = customCategoryRepository.findAllCategoryDtoByUser(id);
        return Stream.concat(defaultCategories.stream(), customCategories.stream())
                    .sorted((category1, category2) -> category1.getName().compareTo(category2.getName())) // sort alphabeticallly 
                    .toList();
    }

    public void createCustomCategory(Category category, User user) {
        String categoryName = category.getName();
        Optional<CustomCategory> optCategory = this.customCategoryRepository.findByNameAndUser(categoryName, user);
        if(optCategory.isPresent()){
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "You already have a category: " + category.getName() + " with the same name");
        }
        CustomCategory customCategory = new CustomCategory(category.getName(), user);
        this.customCategoryRepository.save(customCategory);
    }

    public void deleteCustomCategory(Long categoryId, Long userId) {
        Optional<CustomCategory> optionalCategory = this.customCategoryRepository.findById(categoryId);
        if(optionalCategory.isEmpty()){
            System.out.println("CATEGORY DOESNT EXIST");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category with id: " + categoryId + " does not exist");
        }
        if(!Objects.equals(optionalCategory.get().getUser().getId(), userId)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User does not have authorization to delete this category");
        }
        this.customCategoryRepository.deleteById(categoryId);
    }

    public void updateCustomCategory(Long categoryId, Long userId, String name) {
        Optional<CustomCategory> optionalCategory = this.customCategoryRepository.findById(categoryId);
        if(optionalCategory.isEmpty()){
            System.out.println("CATEGORY DOESNT EXIST");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category with id: " + categoryId + " does not exist");
        }
        CustomCategory category = optionalCategory.get();
        if(!Objects.equals(category.getUser().getId(), userId)){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User does not have the authorization to modify this category");
        }
        category.setName(name);
    }
}

