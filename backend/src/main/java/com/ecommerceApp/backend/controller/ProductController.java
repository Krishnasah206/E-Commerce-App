package com.ecommerceApp.backend.controller;

import com.ecommerceApp.backend.entity.Product;
import com.ecommerceApp.backend.repository.ProductRepository;
import com.ecommerceApp.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.getProductsByCategory(category));
    }

    @GetMapping("/category/{category}/sub/{subCategory}")
    public ResponseEntity<List<Product>> getProductsByCategoryAndSubCategory(
            @PathVariable String category,
            @PathVariable String subCategory) {
        return ResponseEntity.ok(productService.getProductsByCategoryAndSubCategory(category, subCategory));
    }

    @GetMapping("/count/{category}")
    public ResponseEntity<Long> countProductsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.countProductsByCategory(category));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product saved = productRepository.save(product);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable ObjectId id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
