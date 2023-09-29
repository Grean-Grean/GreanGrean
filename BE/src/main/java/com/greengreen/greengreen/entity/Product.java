package com.greengreen.greengreen.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_content")
    private String productContent;

    @Column(name = "product_number", columnDefinition = "Integer")
    private Integer productNumber;

    @Column(name = "product_price", columnDefinition = "Integer")
    private Integer productPrice;

    @Column(name = "product_img")
    private String  productImg;

    @Column(name = "product_create_time")
    private LocalDateTime productCreateTime;

    @Column(name = "product_category")
    private Enum productCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy="review", cascade=CascadeType.ALL)
    @JoinColumn(name = "reviewId")
    private List<Review> review;

    @OneToMany(mappedBy="purchase", cascade=CascadeType.ALL)
    @JoinColumn(name = "purchaseId")
    private List<Purchase> purchase;
}
