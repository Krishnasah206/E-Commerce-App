package com.ecommerceApp.backend.service;

import com.ecommerceApp.backend.dto.OrderRequest;
import com.ecommerceApp.backend.entity.Order;
import com.ecommerceApp.backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final JavaMailSender mailSender;

    public Order createOrder(OrderRequest request) {
        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setItems(request.getCartItems());
        order.setShippingAddress(request.getShippingAddress());
        order.setTotalAmount(request.getTotalAmount());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");

        Order savedOrder = orderRepository.save(order);

        // ✅ Use request.getEmail() here
        sendOrderEmail(request.getEmail(), savedOrder);

        return savedOrder;
    }


    public List<Order> getOrdersByUser(String userId) {
        return orderRepository.findByUserId(userId);
    }

    private void sendOrderEmail(String email, Order order) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email); // ✅ Send to actual user email
        message.setSubject("Order Confirmation");
        message.setText("Your order has been placed successfully.\n\nOrder ID: " + order.getId() +
                "\nTotal Amount: ₹" + order.getTotalAmount() +
                "\n\nThank you for shopping with us!");

        mailSender.send(message);
    }

}
