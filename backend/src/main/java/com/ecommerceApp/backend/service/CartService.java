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
            Product product = productRepository.findById(new ObjectId(item.getProductId()))
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            return CartItemDetailsDTO.builder()
                    .id(item.getId())
                    .productId(product.getId().toHexString())
                    .productName(product.getProductName())
                    .image(product.getImages().isEmpty() ? null : product.getImages().get(0))
                    .price(product.getMrp() - product.getMrp() * (product.getDiscount() / 100.0))
                    .quantity(item.getQuantity())
                    .build();
        }).collect(Collectors.toList());
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

    private CartDTO convertToDTO(Cart item) {
        return CartDTO.builder()
                .id(item.getId())
                .productId(item.getProductId())
                .quantity(item.getQuantity())
                .build();
    }
}

