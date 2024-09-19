package com.app.order.messagebroker;

import com.app.order.model.Orders;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaOrderConsumerService {

    @KafkaListener(topics = "order-topic", groupId = "order-group")
    public void consumeOrderMessage(Orders orders) {

        System.out.println("Received order message for Order ID: {}"+ orders.getOrderID());
        System.out.println("User Email: {}"+ orders.getUserEmail());

        // Process the order details here
        processOrder(orders);
    }

    private void processOrder(Orders orders) {
        // Implement your logic to process the order
        // For example: Save order to database, handle payment, etc.
        System.out.println("Orders" +orders);
    }
}
