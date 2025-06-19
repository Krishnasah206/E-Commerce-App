package com.ecommerceApp.backend.service;

import com.ecommerceApp.backend.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    List<Product> getProductsByCategory(String category);
    List<Product> getProductsByCategoryAndSubCategory(String category, String subCategory);
    long countProductsByCategory(String category);
}
