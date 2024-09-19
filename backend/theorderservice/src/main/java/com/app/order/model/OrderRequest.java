package com.app.order.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderRequest {
    private List<OrderItem> products;
    private String jwtToken;
}
