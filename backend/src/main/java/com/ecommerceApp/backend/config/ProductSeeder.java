//package com.ecommerceApp.backend.config;
//
//import com.ecommerceApp.backend.entity.Product;
//import com.ecommerceApp.backend.repository.ProductRepository;
//import lombok.RequiredArgsConstructor;
//import org.bson.types.ObjectId;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//import java.time.Instant;
//import java.util.*;
//
//@Component
//@RequiredArgsConstructor
//public class ProductSeeder implements CommandLineRunner {
//
//    private final ProductRepository productRepository;
//
//    @Override
//    public void run(String... args) {
//        productRepository.deleteAll();
//
//        List<Product> products = new ArrayList<>();
//
//        products.addAll(generateProducts("Fashion", "Men", "BrandY"));
//        products.addAll(generateProducts("Fashion", "Women", "BrandY"));
//        products.addAll(generateProducts("Fashion", "Children", "BrandY"));
//        products.addAll(generateProducts("Electronics", "Mobile", "BrandX"));
//        products.addAll(generateProducts("Electronics", "Laptop", "BrandX"));
//        products.addAll(generateProducts("Electronics", "Smartwatch", "BrandX"));
//        products.addAll(generateProducts("Bag", "", "BrandZ"));
//        products.addAll(generateProducts("Bag", "", "BrandE"));
//        products.addAll(generateProducts("Bag", "", "BrandW"));
//        products.addAll(generateProducts("Footwear", "Sneaker", "BrandZ"));
//        products.addAll(generateProducts("Footwear", "Formal", "BrandZ"));
//        products.addAll(generateProducts("Footwear", "Sandal", "BrandZ"));
//        products.addAll(generateProducts("Groceries", "", "BrandZ"));
//        products.addAll(generateProducts("Groceries", "", "BrandY"));
//        products.addAll(generateProducts("Groceries", "", "BrandX"));
//        products.addAll(generateProducts("Beauty", "", "BrandZ"));
//        products.addAll(generateProducts("Beauty", "", "BrandX"));
//        products.addAll(generateProducts("Beauty", "", "BrandY"));
//        products.addAll(generateProducts("Wellness", "", "BrandZ"));
//        products.addAll(generateProducts("Wellness", "", "BrandY"));
//        products.addAll(generateProducts("Wellness", "", "BrandX"));
//        products.addAll(generateProducts("Jewellery", "", "BrandZ"));
//        products.addAll(generateProducts("Jewellery", "", "BrandY"));
//        products.addAll(generateProducts("Jewellery", "", "BrandX"));
//
//
//
//        productRepository.saveAll(products);
//    }
//
//    private List<Product> generateProducts(String category, String subCategory, String brand) {
//        List<Product> products = new ArrayList<>();
//        for (int i = 1; i <= 7; i++) {
//            products.add(Product.builder()
//                    .id(ObjectId.get())
//                    .productName(category + " Product " + i)
//                    .brand(brand)
//                    .category(category)
//                    .subCategory(subCategory)
//                    .rating(4.0 + (i % 5) * 0.1) // Ratings from 4.0 to 4.4
//                    .mrp(100.0 + i)
//                    .discount((i % 10) + 5) // Discounts from 5% to 14%
//                    .stock(50 + i)
//                    .description("Sample description for " + category + " Product " + i)
//                    .images(List.of("https://via.placeholder.com/150"))
//                    .attributes(Map.of(
//                            "Color", "Black",
//                            "Size", "Medium",
//                            "Weight", i + "g"
//                    ))
//                    .createdAt(Instant.now())
//                    .updatedAt(Instant.now())
//                    .build());
//        }
//        return products;
//    }
//}
