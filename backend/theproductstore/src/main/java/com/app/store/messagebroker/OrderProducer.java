package com.app.store.messagebroker;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderProducer {
    private static final String TOPIC = "order-topic";
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final HttpServletRequest request;

    public OrderProducer(KafkaTemplate<String, String> kafkaTemplate, HttpServletRequest request) {
        this.kafkaTemplate = kafkaTemplate;
        this.request = request;
    }

    public void sendProductOrder(String productId, int quantity) {
        // Extract JWT token from the request header
        String jwtToken = request.getHeader("Authorization");

        // Prepare JSON message with product details, quantity, and JWT token
        String message = "{ \"productId\": \"" + productId + "\", \"quantity\": " + quantity + ", \"jwtToken\": \"" + jwtToken + "\" }";
        kafkaTemplate.send(TOPIC, message);
    }
}
