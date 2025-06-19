package com.ecommerceApp.backend.dto;

import com.ecommerceApp.backend.entity.Review;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductDTO {
    private String id;
    private String productName;
    private String brand;
    private String category;
    private String subCategory;
    private Double rating;
    private List<Review> reviews;
    private Double mrp;
    private Integer discount;
    private Integer stock;
    private String description;
    private List<String> images;
}
