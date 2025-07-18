package com.ecommerceApp.backend.repository;

import com.ecommerceApp.backend.entity.Product;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, ObjectId> {
    List<Product> findByCategory(String category);
    List<Product> findByCategoryAndSubCategory(String category, String subCategory);
    long countByCategory(String category);
    List<Product> findByCategoryInIgnoreCase(List<String> categories);
    List<Product> findByProductNameContainingIgnoreCase(String name);

    List<Product> findByCategoryIn(List<String> categories);

    List<Product> findByProductNameContainingIgnoreCaseAndCategoryIn(String productName, List<String> categories);

}

