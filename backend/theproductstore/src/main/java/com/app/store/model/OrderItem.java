package com.app.store.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderItem {
    private Long productID;
    private int quantity;
}
