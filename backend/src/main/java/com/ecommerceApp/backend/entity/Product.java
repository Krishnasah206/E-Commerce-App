package com.ecommerceApp.backend.entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "products")
public class Product {

    @Id
    private ObjectId id;

    @NonNull
    private String productName;

    @NonNull
    private String brand;

    @NonNull
    private String category;

    private String subCategory;

    @NonNull
    private Double rating;

    private List<Review> reviews;

    @NonNull
    private Double mrp;

    @NonNull
    private Integer discount;

    @NonNull
    private Integer stock;

    @NonNull
    private String description;

    private Map<String, Object> attributes;

    @NonNull
    private List<String> images;

    @CreatedDate
    private Instant createdAt;

    private Instant updatedAt;
}

