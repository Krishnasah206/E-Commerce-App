package com.ecommerceApp.backend.service;

import com.ecommerceApp.backend.dto.AuthResponse;
import com.ecommerceApp.backend.entity.User;
import com.ecommerceApp.backend.repository.UserRepository;
import com.ecommerceApp.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    // ✅ Register new user
    public User register(String username, String email, String password) {
        if (userRepository.existsByUsername(username))
            throw new RuntimeException("Username already taken");

        User user = User.builder()
                .username(username)
                .email(email)
                .password(encoder.encode(password))
                .roles(Set.of("ROLE_USER"))  // Default role
                .build();

        return userRepository.save(user);
    }

    // ✅ Login user & return JWT
    public AuthResponse login(String username, String password) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        if (!auth.isAuthenticated()) {
            throw new BadCredentialsException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(username);
        return new AuthResponse(token);
    }

    // ✅ Required for JWT security to load user
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Not found"));

        return new org.springframework.security.core.userdetails.User(
                u.getUsername(),
                u.getPassword(),
                u.getRoles().stream().map(SimpleGrantedAuthority::new).toList()
        );
    }
}
