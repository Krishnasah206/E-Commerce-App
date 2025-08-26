package com.ecommerceApp.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;

@Service
public class ProductViewProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper mapper = new ObjectMapper();

    @Value("${app.kafka.topic.product-views:product_views}")
    private String topic;

    public ProductViewProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishProductView(String userId, String productId) {
        try {
            String payload = mapper.writeValueAsString(Map.of(
                    "userId", userId,
                    "productId", productId,
                    "timestamp", Instant.now().toString()
            ));

            kafkaTemplate.send(topic, productId, payload);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
