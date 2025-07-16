package com.ecommerceApp.backend.service;

import com.ecommerceApp.backend.entity.User;
import com.ecommerceApp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public ResponseEntity<String> register(User request) {
        if (userRepository.existsByUserName(request.getUserName())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Username already exists");
        }

        User newUser = User.builder()
                .userName(request.getUserName())
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .roles(Set.of("USER")) // default role
                .build();

        userRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User registered: " + newUser.getUserName());
    }

    public ResponseEntity<String> login(String userName, String password) {
        return userRepository.findByUserName(userName)
                .map(user -> {
                    if (encoder.matches(password, user.getPassword())) {
                        return ResponseEntity.ok("Login successful");
                    } else {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body("Invalid credentials");
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found"));
    }
}
