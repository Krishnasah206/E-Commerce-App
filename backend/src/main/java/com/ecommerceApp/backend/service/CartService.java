package com.ecommerceApp.backend.service;

import com.ecommerceApp.backend.dto.CartDTO;
import com.ecommerceApp.backend.dto.CartItemDetailsDTO;
import com.ecommerceApp.backend.entity.Cart;
import com.ecommerceApp.backend.entity.Product;
import com.ecommerceApp.backend.repository.CartRepository;
import com.ecommerceApp.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository; // ✅ add this


    public List<CartItemDetailsDTO> getCartDetailsByUser(String userId) {
        List<Cart> cartItems = cartRepository.findByUserId(userId);

        return cartItems.stream().map(item -> {
            Product product = fetchProductById(item.getProductId());

            return CartItemDetailsDTO.builder()
                    .id(item.getId())
                    .productId(product.getId().toHexString())
                    .productName(product.getProductName())
                    .image(product.getImages() != null && !product.getImages().isEmpty() ? product.getImages().get(0) : null)
                    .price(calculateDiscountedPrice(product.getMrp(), product.getDiscount()))
                    .quantity(item.getQuantity())
                    .build();
        }).collect(Collectors.toList());
    }

    // Helper method to safely fetch Product by string ID
    private Product fetchProductById(String productId) {
        try {
            ObjectId objectId = new ObjectId(productId);
            return productRepository.findById(objectId)
                    .orElseThrow(() -> new RuntimeException("Product not found for ID: " + productId));
        } catch (IllegalArgumentException ex) {
            throw new RuntimeException("Invalid product ID format: " + productId);
        }
    }

    // Helper method to calculate discounted price
    private double calculateDiscountedPrice(double mrp, double discount) {
        return mrp - (mrp * discount / 100.0);
    }



    public List<CartDTO> getCartByUser(String userId) {
        return cartRepository.findByUserId(userId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CartDTO addToCart(String userId, CartDTO cartItemDTO) {
        Cart existing = cartRepository.findByUserIdAndProductId(userId, cartItemDTO.getProductId());
        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + cartItemDTO.getQuantity());
            Cart updated = cartRepository.save(existing);
            return convertToDTO(updated);
        }

        Cart cartItem = Cart.builder()
                .userId(userId)
                .productId(cartItemDTO.getProductId())
                .quantity(cartItemDTO.getQuantity())
                .build();

        Cart saved = cartRepository.save(cartItem);
        return convertToDTO(saved);
    }


    public void removeFromCart(String userId, String productId) {
        cartRepository.deleteByUserIdAndProductId(userId, productId);
    }

    public void clearCart(String userId) {
        List<Cart> userCartItems = cartRepository.findByUserId(userId);
        if (!userCartItems.isEmpty()) {
            cartRepository.deleteAll(userCartItems);
        }
    }



    private CartDTO convertToDTO(Cart item) {
        return CartDTO.builder()
                .id(item.getId())
                .productId(item.getProductId())
                .quantity(item.getQuantity())
                .build();
    }
}

