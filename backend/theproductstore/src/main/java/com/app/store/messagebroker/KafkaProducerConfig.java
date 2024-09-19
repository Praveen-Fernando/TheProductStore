package com.app.store.messagebroker;

import com.app.store.model.OrderRequest;
import jakarta.annotation.PostConstruct;
import org.apache.kafka.clients.admin.*;
import org.springframework.kafka.support.serializer.JsonSerializer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.hibernate.boot.model.source.spi.Orderable;
import org.hibernate.query.Order;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.annotation.EnableKafka;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Configuration
public class KafkaProducerConfig {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;
    private boolean topicsDeleted = false;
    private boolean consumerGroupsDeleted = false;

    @PostConstruct
    public void init() throws ExecutionException, InterruptedException {
        if (!topicsDeleted) {
            deleteAllTopics();
            topicsDeleted = true;
        }

        if (!consumerGroupsDeleted) {
            deleteAllConsumerGroups();
            consumerGroupsDeleted = true;
        }
    }

    @Bean
    public ProducerFactory<String, OrderRequest> producerFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        return new DefaultKafkaProducerFactory<>(configProps);
    }

    @Bean
    public KafkaTemplate<String, OrderRequest> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }


    private void deleteAllTopics() throws ExecutionException, InterruptedException {
        // Create AdminClient
        Map<String, Object> adminProps = Map.of(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        try (AdminClient adminClient = AdminClient.create(adminProps)) {
            // List all topics
            ListTopicsResult listTopicsResult = adminClient.listTopics();
            Set<String> topicNames = listTopicsResult.names().get();

            // Delete all topics
            if (!topicNames.isEmpty()) {
                DeleteTopicsResult deleteTopicsResult = adminClient.deleteTopics(topicNames);
                deleteTopicsResult.all().get(); // Wait until all topics are deleted
                System.out.println("Deleted topics: " + topicNames);
            } else {
                System.out.println("No topics to delete.");
            }
        }
    }

    private void deleteAllConsumerGroups() throws ExecutionException, InterruptedException {
        // Create AdminClient
        Map<String, Object> adminProps = Map.of(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        try (AdminClient adminClient = AdminClient.create(adminProps)) {
            // List all consumer groups
            ListConsumerGroupsResult listConsumerGroupsResult = adminClient.listConsumerGroups();
            Set<String> groupIds = listConsumerGroupsResult.all().get().stream()
                    .map(ConsumerGroupListing::groupId)
                    .collect(Collectors.toSet());

            // Delete all consumer groups
            if (!groupIds.isEmpty()) {
                DeleteConsumerGroupsResult deleteGroupsResult = adminClient.deleteConsumerGroups(groupIds);
                deleteGroupsResult.all().get(); // Wait until all groups are deleted
                System.out.println("Deleted consumer groups: " + groupIds);
            } else {
                System.out.println("No consumer groups to delete.");
            }
        }
    }
}