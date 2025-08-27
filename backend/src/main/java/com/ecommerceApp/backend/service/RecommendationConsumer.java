package com.ecommerceApp.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RecommendationConsumer {

    private final RestTemplate restTemplate;
    private final ObjectMapper mapper = new ObjectMapper();

    public RecommendationConsumer(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    @Value("${app.recommender.url}")
    private String recommenderBaseUrl;

    @KafkaListener(topics = "${app.kafka.topic.product-views:product_views}", groupId = "recommendation-service")
    public void listen(String message) {
        try {
            JsonNode node = mapper.readTree(message);
            String productId = node.get("productId").asText();

            String recommenderUrl = recommenderBaseUrl + "/recommend/" + productId + "?top_n=10";

            ResponseEntity<String> response = restTemplate.getForEntity(recommenderUrl, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                String recommendationsJson = response.getBody();
                // TODO: Store recommendations in Redis or DB for fast retrieval
                System.out.println("Recommendations for product " + productId + ": " + recommendationsJson);
            }

        } catch (Exception e) {
            e.printStackTrace();
            // Optional: implement retries or DLQ
        }
    }

}
