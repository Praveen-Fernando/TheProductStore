package com.app.order.messagebroker;

import com.app.order.model.Orders;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaListeners {
    @KafkaListener(topics = "order-topic", groupId = "order-group")
    void listener(String data){
        System.out.println("Received Data : " +data);
    }
}
