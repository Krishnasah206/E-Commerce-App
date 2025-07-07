package com.ecommerceApp.backend.controller;

import com.ecommerceApp.backend.dto.ProductDTO;
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

    private final ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    // ✅ Get all products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // ✅ Get products by a single category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.getProductsByCategory(category));
    }

    // ✅ Get products by category and subcategory
    @GetMapping("/category/{category}/sub/{subCategory}")
    public ResponseEntity<List<Product>> getProductsByCategoryAndSubCategory(
            @PathVariable String category,
            @PathVariable String subCategory) {
        return ResponseEntity.ok(productService.getProductsByCategoryAndSubCategory(category, subCategory));
    }

    // ✅ Count products by category
    @GetMapping("/count/{category}")
    public ResponseEntity<Long> countProductsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.countProductsByCategory(category));
    }

    // ✅ Add a new product (Admin only)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product saved = productRepository.save(product);
        return ResponseEntity.ok(saved);
    }

    // ✅ Get product by ID and convert to DTO
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable String id) {
        Product product = productRepository.findById(new ObjectId(id))
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return ResponseEntity.ok(convertToDTO(product));
    }

    // ✅ 🔥 Multi-category filter using query params
    @GetMapping("/filter")
    public ResponseEntity<List<Product>> getProductsByMultipleCategories(
            @RequestParam List<String> categories) {
        return ResponseEntity.ok(productService.getProductsByMultipleCategories(categories));
    }

    // 👉 Private helper to convert Entity to DTO
    private ProductDTO convertToDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId().toHexString())
                .productName(product.getProductName())
                .brand(product.getBrand())
                .category(product.getCategory())
                .subCategory(product.getSubCategory())
                .rating(product.getRating())
                .reviews(product.getReviews())
                .mrp(product.getMrp())
                .discount(product.getDiscount())
                .stock(product.getStock())
                .description(product.getDescription())
                .images(product.getImages())
                .build();
    }
}
