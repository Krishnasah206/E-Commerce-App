package com.ecommerceApp.backend.service;

import com.ecommerceApp.backend.dto.LoginResponse;
import com.ecommerceApp.backend.entity.User;
import com.ecommerceApp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
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
                .phoneNumber(request.getPhoneNumber())
                .password(encoder.encode(request.getPassword()))
                .roles(Set.of("ROLE_USER")) // default role
                .build();

        userRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User registered: " + newUser.getUserName());
    }

    public ResponseEntity<LoginResponse> login(String loginField, String password) {
        Optional<User> userOpt = userRepository.findByUserName(loginField);

        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByEmail(loginField);
        }

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build(); // optionally include a body
        }

        User user = userOpt.get();

        if (!encoder.matches(password, user.getPassword())) {
            return ResponseEntity.badRequest().build(); // optionally include a body
        }

        return ResponseEntity.ok(
                new LoginResponse(user.getUserName(), user.getId().toHexString())
        );

    }

}
