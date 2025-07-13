package com.ecommerceApp.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemDetailsDTO {
    private String id;
    private String productId;
    private String productName;
    private String image;
    private double price;
    private int quantity;
}

