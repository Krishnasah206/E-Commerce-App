package com.ecommerceApp.backend.controller;

import com.ecommerceApp.backend.dto.ProductDTO;
import com.ecommerceApp.backend.entity.Product;
import com.ecommerceApp.backend.repository.ProductRepository;
import com.ecommerceApp.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/")
public class ProductController {

    private final ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    // ✅ Public - Get all products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // ✅ Public - Get by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.getProductsByCategory(category));
    }

    // ✅ Public - Get by category + sub-category
    @GetMapping("/category/{category}/sub/{subCategory}")
    public ResponseEntity<List<Product>> getProductsByCategoryAndSubCategory(
            @PathVariable String category,
            @PathVariable String subCategory) {
        return ResponseEntity.ok(productService.getProductsByCategoryAndSubCategory(category, subCategory));
    }

    // ✅ Public - Count by category
    @GetMapping("/count/{category}")
    public ResponseEntity<Long> countProductsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.countProductsByCategory(category));
    }

    // ✅ Public - Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable String id) {
        Product product = productRepository.findById(new ObjectId(id))
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return ResponseEntity.ok(convertToDTO(product));
    }

    // ✅ Public - Filter by multiple categories
    @GetMapping("/filter")
    public ResponseEntity<List<Product>> getProductsByMultipleCategories(
            @RequestParam List<String> categories) {
        return ResponseEntity.ok(productService.getProductsByMultipleCategories(categories));
    }

    // ✅ Admin Only - Add product
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product saved = productRepository.save(product);
        return ResponseEntity.ok(saved);
    }

    // ✅ Admin Only - Update product
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product product) {
        product.setId(new ObjectId(id));
        Product updated = productRepository.save(product);
        return ResponseEntity.ok(updated);
    }

    // ✅ Admin Only - Delete product
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        productRepository.deleteById(new ObjectId(id));
        return ResponseEntity.noContent().build();
    }

//    @GetMapping("/search")
//    public ResponseEntity<?> searchProductByName(@RequestParam String query) {
//        List<Product> matchingProducts = productRepository.findByProductNameContainingIgnoreCase(query);
//        if (matchingProducts.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No product found");
//        }
//        return ResponseEntity.ok(matchingProducts);
//    }

    @GetMapping("/search")
    public ResponseEntity<?> searchProductByNameAndCategory(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) List<String> categories) {

        List<Product> matchingProducts;

        if (query != null && categories != null && !categories.isEmpty()) {
            // ✅ Both query and category filter
            matchingProducts = productRepository
                    .findByProductNameContainingIgnoreCaseAndCategoryIn(query, categories);
        } else if (query != null) {
            // ✅ Only search query
            matchingProducts = productRepository.findByProductNameContainingIgnoreCase(query);
        } else if (categories != null && !categories.isEmpty()) {
            // ✅ Only category filter
            matchingProducts = productRepository.findByCategoryIn(categories);
        } else {
            // ✅ No filter, return all
            matchingProducts = productRepository.findAll();
        }

        if (matchingProducts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No product found");
        }
        return ResponseEntity.ok(matchingProducts);
    }



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

