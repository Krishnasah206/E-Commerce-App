package com.ecommerceApp.backend.controller;

import com.ecommerceApp.backend.service.ProductViewProducer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;

@RestController
@RequestMapping("/recommend")
public class RecommendationController {

    private final ProductViewProducer producer;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${app.recommender.url}")
    private String recommenderBaseUrl;

    public RecommendationController(ProductViewProducer producer) {
        this.producer = producer;
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Map<String, Object>> recommend(
            @PathVariable String productId,
            @RequestHeader(value = "userId", required = false) String userId
    ) {
        if (userId != null && !userId.isEmpty()) {
            producer.publishProductView(userId, productId);
        }

        // Use value from application.yml
        String recommenderUrl = recommenderBaseUrl + "/" + productId + "?top_n=6";

        try {
            ResponseEntity<Map> response = restTemplate.getForEntity(recommenderUrl, Map.class);
            Map<String, Object> body = response.getBody();

            if (body == null || !body.containsKey("recommendations")) {
                return ResponseEntity.ok(Map.of("recommendedIds", Collections.emptyList()));
            }

            List<String> ids = ((List<Map<String, Object>>) body.get("recommendations"))
                    .stream()
                    .filter(r -> r.containsKey("ID"))
                    .map(r -> r.get("ID").toString())
                    .toList();

            return ResponseEntity.ok(Map.of("recommendedIds", ids));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(Map.of("recommendedIds", Collections.emptyList()));
        }
    }
}


