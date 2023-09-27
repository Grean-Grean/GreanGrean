package com.greengreen.greengreen.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long purchaseId;

    @Column(name = "purchase_name")
    private String purchaseName;

    @Column(name = "purchase_address")
    private String purchaseAddress;

    @Column(name = "purchase_number", columnDefinition = "Integer")
    private Integer purchaseNumber;

    @Column(name = "purchase_time")
    private LocalDateTime purchaseTime;

    @Column(name = "purchase_phone_number")
    private String purchasePhoneNumber;

    @Column(name = "purchase_state")
    private String purchaseState;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productId")
    private Product product;
}
