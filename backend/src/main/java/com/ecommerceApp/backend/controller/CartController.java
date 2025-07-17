package com.ecommerceApp.backend.controller;

import com.ecommerceApp.backend.dto.CartDTO;
import com.ecommerceApp.backend.dto.CartItemDetailsDTO;
import com.ecommerceApp.backend.entity.User;
import com.ecommerceApp.backend.service.CartService;
import com.ecommerceApp.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/")
public class CartController {

    private final CartService cartService;
    private final UserRepository userRepository;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{userId}")
    public ResponseEntity<List<CartDTO>> getCart(@PathVariable String userId, Principal principal) {
        if (!isUserAuthorized(userId, principal)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(cartService.getCartByUser(userId));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/details/{userId}")
    public ResponseEntity<List<CartItemDetailsDTO>> getCartDetails(@PathVariable String userId, Principal principal) {
        if (!isUserAuthorized(userId, principal)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(cartService.getCartDetailsByUser(userId));
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/{userId}/add")
    public ResponseEntity<CartDTO> addToCart(@PathVariable String userId, @RequestBody CartDTO cartItemDTO, Principal principal) {
        if (!isUserAuthorized(userId, principal)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(cartService.addToCart(userId, cartItemDTO));
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{userId}/remove/{productId}")
    public ResponseEntity<String> removeFromCart(@PathVariable String userId, @PathVariable String productId, Principal principal) {
        if (!isUserAuthorized(userId, principal)) return ResponseEntity.status(403).build();
        cartService.removeFromCart(userId, productId);
        return ResponseEntity.ok("Item removed from cart");
    }

    // Utility Method to validate logged-in user
    private boolean isUserAuthorized(String userId, Principal principal) {
        if (principal == null) return false;
        String username = principal.getName();
        User user = userRepository.findByUserName(username).orElse(null);
        return user != null && user.getId().toString().equals(userId);
    }
}
