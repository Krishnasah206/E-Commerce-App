package com.ecommerceApp.backend.controller;

import com.ecommerceApp.backend.service.ProductViewProducer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/recommend")
public class RecommendationController {

    private final ProductViewProducer producer;

    public RecommendationController(ProductViewProducer producer) {
        this.producer = producer;
    }

    /**
     * Trigger recommendation when a product is viewed
     */
    @GetMapping("/{productId}")
    public ResponseEntity<Map<String, Object>> recommend(
            @PathVariable String productId,
            @RequestHeader(value = "userId", required = false) String userId
    ) {
        if (userId != null) {
            producer.publishProductView(userId, productId);
        }

        RestTemplate restTemplate = new RestTemplate();
        String recommenderUrl = "https://fastapi-recommendation-7d6c.onrender.com/recommend/" + productId + "?top_n=6";

        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(recommenderUrl, Map.class);
            Map<String, Object> body = response.getBody();

            // Extract only IDs
            List<String> ids = ((List<Map<String, Object>>) body.get("recommendations"))
                    .stream()
                    .map(r -> r.get("ID").toString())
                    .toList();

            return ResponseEntity.ok(Map.of("recommendedIds", ids));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(Map.of("recommendedIds", new ArrayList<>()));
        }
    }

}

