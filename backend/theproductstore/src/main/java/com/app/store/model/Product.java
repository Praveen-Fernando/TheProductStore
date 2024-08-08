package com.app.store.model;

import com.app.store.enums.Brands;
import com.app.store.enums.ProductCategoryTypes;
import com.app.store.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

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

    @Column(name = "productDescription")
    private String productDescription;

    @Column(name = "productAddedDate")
    private Date productAddedDate;

    @Column(name = "productStock")
    private int productStock;

    @Enumerated(EnumType.STRING)
    @Column(name = "productBrand")
    private Brands productBrand;

    @Column(name = "sellerEmail")
    private String sellerEmail;

    @Enumerated(EnumType.STRING)
    @Column(name = "productStatus")
    private ProductStatus productStatus;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "productID")
    private List<ProductImage> productImages;

    @Column(name = "productUpdateDate")
    private Date productUpdateDate;
}
