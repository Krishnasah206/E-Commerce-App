package com.ecommerceApp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {
    private boolean success;
    private String message;
    private Object data;

    // ✅ Add this constructor manually
    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
