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

//    private void sendOrderEmail(String email, Order order) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(email); // ✅ Send to actual user email
//        message.setSubject("Order Confirmation");
//        message.setText("Your order has been placed successfully.\n\nOrder ID: " + order.getId() +
//                "\nTotal Amount: ₹" + order.getTotalAmount() +
//                "\n\nThank you for shopping with us!");
//
//        mailSender.send(message);
//    }

    private void sendOrderEmail(String email, Order order) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email); // ✅ Send to actual user email
        message.setSubject("🛍️ Your Trendify Order Confirmation - #" + order.getId());

        String emailText = "Hello,\n\n"
                + "Thank you for shopping with Trendify! 🎉\n\n"
                + "We’re excited to let you know that your order has been successfully placed and is now being processed.\n\n"
                + "📦 Order Details:\n"
                + "--------------------------------------------------\n"
                + "Order ID: " + order.getId() + "\n"
                + "Order Date: " + java.time.LocalDate.now() + "\n"
                + "Total Amount: ₹" + order.getTotalAmount() + "\n"
                + "Payment Status: Cash on Delivery\n"
                + "--------------------------------------------------\n\n"
                + "🛒 What happens next?\n"
                + "- Our team is carefully packing your items.\n"
                + "- You’ll receive another email with tracking details once your order is shipped.\n\n"
                + "💡 Tip: You can track your order anytime by logging into your Trendify account.\n\n"
                + "Thank you for choosing Trendify – where trends meet trust.\n\n"
                + "Best Regards,\n"
                + "The Trendify Team\n";

        message.setText(emailText);
        mailSender.send(message);
    }


}
