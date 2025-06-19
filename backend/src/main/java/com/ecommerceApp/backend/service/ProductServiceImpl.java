package com.ecommerceApp.backend.service;

import com.ecommerceApp.backend.entity.Product;
import com.ecommerceApp.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    @Override
    public List<Product> getProductsByCategoryAndSubCategory(String category, String subCategory) {
        return productRepository.findByCategoryAndSubCategory(category, subCategory);
    }

    @Override
    public long countProductsByCategory(String category) {
        return productRepository.countByCategory(category);
    }
}
