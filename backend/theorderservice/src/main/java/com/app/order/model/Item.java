package com.app.order.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Data
@Table(name = "OrderItems")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "orderID")
    private Orders orders;

    @Column(name = "productID")
    private Long productID;

    @Column(name = "quantity")
    private Integer quantity;
}
