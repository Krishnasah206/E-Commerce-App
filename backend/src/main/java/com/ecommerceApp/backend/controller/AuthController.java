package com.ecommerceApp.backend.controller;

import com.ecommerceApp.backend.dto.AuthRequest;
import com.ecommerceApp.backend.entity.User;
import com.ecommerceApp.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest request) {
        return userService.login(request.getUserName(), request.getPassword());
    }

}
