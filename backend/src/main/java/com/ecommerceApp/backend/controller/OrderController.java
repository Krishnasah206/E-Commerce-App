package com.ecommerceApp.backend.controller;

import com.ecommerceApp.backend.dto.ApiResponse;
import com.ecommerceApp.backend.dto.OrderRequest;
import com.ecommerceApp.backend.entity.Order;
import com.ecommerceApp.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest request) {
        Order order = orderService.createOrder(request);
        return ResponseEntity.ok(new ApiResponse(true, "Order placed", order));
    }

    @GetMapping("/{userId}")
    public List<Order> getOrders(@PathVariable String userId) {
        return orderService.getOrdersByUser(userId);
    }
}

