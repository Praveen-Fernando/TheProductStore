package com.app.store.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderRequest {
    private List<OrderItem> products;
    private double totalAmount;
    private String jwtToken;
}
