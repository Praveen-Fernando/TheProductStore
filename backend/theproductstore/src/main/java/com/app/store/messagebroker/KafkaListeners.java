package com.app.store.messagebroker;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaListeners {

    @KafkaListener(topics = "order-topic", groupId = "order-group")
    void listener(String data){
        System.out.println("Received Data : " +data);
    }
}
