package com.ecommerceApp.backend.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String loginField; // can be username or email
    private String password;
}
