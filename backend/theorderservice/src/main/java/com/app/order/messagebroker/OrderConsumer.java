//package com.app.order.messagebroker;
//
//import com.app.order.model.Orders;
//import com.app.order.service.OrderService;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.kafka.core.KafkaTemplate;
//
//public class OrderConsumer {
//
//    private final OrderService orderService;
//    private final KafkaTemplate<String, String> kafkaTemplate;
//
//    public OrderConsumer(OrderService orderService, KafkaTemplate<String, String> kafkaTemplate) {
//        this.orderService = orderService;
//        this.kafkaTemplate = kafkaTemplate;
//    }
//
//    @KafkaListener(topics = "order-topic", groupId = "order-group")
//    public void consumeProductOrder(String message) {
//        // Parse message and process the order
//        Long productId = extractProductId(message);
//        int quantity = extractQuantity(message);
//
//        Orders order = orderService.createOrder(productId, quantity);
//
//        // Assume payment is processed successfully here
//        orderService.confirmOrder(order.getOrderID());
//
//        // Send payment confirmation to product service
//        kafkaTemplate.send("payment-topic", "{ \"productId\": " + productId + ", \"quantity\": " + quantity + "}");
//    }
//
//    private Long extractProductId(String message) {
//        // Parse JSON to extract productId (pseudo-code)
//        return 1L;
//    }
//
//    private int extractQuantity(String message) {
//        // Parse JSON to extract quantity (pseudo-code)
//        return 1;
//    }
//}
