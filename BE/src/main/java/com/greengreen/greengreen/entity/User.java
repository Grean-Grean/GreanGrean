package com.greengreen.greengreen.entity;

import javax.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "user_email", length = 20)
    private String userEmail;

    @Column(name = "user_password", length = 20)
    private String userPassword;

    @Column(name = "user_name", length = 5)
    private String userName;

    @Column(name = "user_nick_name", length = 20)
    private String userNickName;

    @OneToMany(mappedBy="faq")
    private List<Faq> faqList;

    @OneToMany(mappedBy="product", cascade=CascadeType.ALL)
    private List<Product> productList;

    @OneToMany(mappedBy="review", cascade=CascadeType.ALL)
    private List<Review> reviewList;

    @OneToMany(mappedBy="purchase", cascade=CascadeType.ALL)
    private List<Purchase> purchaseList;
