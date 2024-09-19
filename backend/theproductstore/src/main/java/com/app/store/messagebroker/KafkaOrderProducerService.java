package com.app.store.messagebroker;

import com.app.store.model.OrderRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaOrderProducerService {
//    @Value("${kafka.topic.order}")
//    private String orderTopic;
    private final KafkaTemplate<String, OrderRequest> kafkaTemplate;

    public KafkaOrderProducerService(KafkaTemplate<String, OrderRequest> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendOrder(OrderRequest orderRequest) {
        kafkaTemplate.send("order-topic", orderRequest);
    }
}
