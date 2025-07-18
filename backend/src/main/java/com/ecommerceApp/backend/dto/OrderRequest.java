package com.ecommerceApp.backend.dto;

import com.ecommerceApp.backend.entity.Cart;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private String userId;
    private String email; // ✅ Add this
    private List<Cart> cartItems;
    private String shippingAddress;
    private double totalAmount;
}


