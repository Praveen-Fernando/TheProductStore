package com.app.store.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.format.DateTimeFormatter;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Data
@Table(name = "Product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long productID;

    @Column(name = "productName")
    private String productName;

    @Column(name = "productPrice")
    private double productPrice;

    @Column(name = "productCategory")
    private String productCategory;

    @Column(name = "productAddedDate")
    private Date productAddedDate;

    @Column(name = "productStock")
    private int productStock;

    @Column(name = "seller")
    private String seller;
}
