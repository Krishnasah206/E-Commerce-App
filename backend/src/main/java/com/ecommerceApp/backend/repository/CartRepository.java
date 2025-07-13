package com.ecommerceApp.backend.repository;

import com.ecommerceApp.backend.entity.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CartRepository extends MongoRepository<Cart, String> {
    List<Cart> findByUserId(String userId);
    void deleteByUserIdAndProductId(String userId, String productId);
    Cart findByUserIdAndProductId(String userId, String productId);
}
