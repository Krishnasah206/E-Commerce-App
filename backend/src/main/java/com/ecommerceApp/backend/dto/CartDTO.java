package com.ecommerceApp.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartDTO {
    private String id;
    private String productId;
    private int quantity;
}

