package com.ecommerceApp.backend.controller;

import com.ecommerceApp.backend.dto.CartDTO;
import com.ecommerceApp.backend.dto.CartItemDetailsDTO;
import com.ecommerceApp.backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173/")
public class CartController {

    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartDTO>> getCart(@PathVariable String userId) {
        return ResponseEntity.ok(cartService.getCartByUser(userId));
    }

    @GetMapping("/details/{userId}")
    public ResponseEntity<List<CartItemDetailsDTO>> getCartDetails(@PathVariable String userId) {
        return ResponseEntity.ok(cartService.getCartDetailsByUser(userId));
    }


    @PostMapping("/{userId}/add")
    public ResponseEntity<CartDTO> addToCart(
            @PathVariable String userId,
            @RequestBody CartDTO cartItemDTO) {
        return ResponseEntity.ok(cartService.addToCart(userId, cartItemDTO));
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    public ResponseEntity<String> removeFromCart(
            @PathVariable String userId,
            @PathVariable String productId) {
        cartService.removeFromCart(userId, productId);
        return ResponseEntity.ok("Item removed from cart");
    }
}
