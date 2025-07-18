package com.ecommerceApp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String userName;
    private String userId;
    private String token;
    private String message;

    // Optional convenience constructor for success response
    public LoginResponse(String userName, String userId, String token) {
        this.userName = userName;
        this.userId = userId;
        this.token = token;
        this.message = null;
    }
}
