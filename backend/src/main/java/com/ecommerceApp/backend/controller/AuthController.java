package com.ecommerceApp.backend.controller;

import com.ecommerceApp.backend.dto.ApiResponse;
import com.ecommerceApp.backend.dto.AuthRequest;
import com.ecommerceApp.backend.dto.LoginResponse;
import com.ecommerceApp.backend.entity.User;
import com.ecommerceApp.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/")  // Update to your frontend URL if different
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody User request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody AuthRequest request) {
        return userService.login(request.getLoginField(), request.getPassword());
    }

    @PostMapping("/verify-otp")  // ✅ Fixed route (removed redundant '/auth')
    public ResponseEntity<ApiResponse> verifyOtp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String otp = payload.get("otp");
        return userService.verifyOtp(email, otp);
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<ApiResponse> resendOtp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        return userService.resendOtp(email);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        return userService.forgotPassword(email);
    }


    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String otp = payload.get("otp");
        String newPassword = payload.get("newPassword");
        String confirmPassword = payload.get("confirmPassword");
        return userService.resetPassword(email, otp, newPassword, confirmPassword);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable String userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
