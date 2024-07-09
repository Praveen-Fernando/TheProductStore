package com.app.store.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "Seller")
public class Seller {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long sellerID;

    @Column(name = "sellerName")
    private String sellerName;

    @Column(name = "sellerMail")
    private String sellerMail;

    @Column(name = "sellerNic")
    private String sellerNic;

    @Column(name = "sellerContact")
    private String sellerContact;

    @Column(name = "sellerAddress")
    private String sellerAddress;

}
