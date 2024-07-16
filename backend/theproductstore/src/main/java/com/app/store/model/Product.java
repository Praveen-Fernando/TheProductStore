package com.app.store.model;

import com.app.store.enums.ProductCategoryTypes;
import jakarta.persistence.*;
import lombok.*;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productID;

    @Column(name = "productName")
    private String productName;

    @Column(name = "productPrice")
    private double productPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "productCategory")
    private ProductCategoryTypes productCategory;

    @Column(name = "productAddedDate")
    private Date productAddedDate;

    @Column(name = "productStock")
    private int productStock;

    @Column(name = "sellerEmail")
    private String sellerEmail;
}
