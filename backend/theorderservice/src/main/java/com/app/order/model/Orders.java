package com.app.order.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Data
@Table(name = "Orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderID;

    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
    private List<Item> orderItems;

    @Column(name = "userEmail")
    private String userEmail;

    @Column(name = "userName")
    private String userName;

    @Column(name = "userContact")
    private String userContact;

    @Column(name = "userAddress")
    private String userAddress;

    @Column(name = "orderDate")
    private LocalDateTime orderDate;

    @Column(name = "paymentStatus")
    private boolean paymentStatus;
}
