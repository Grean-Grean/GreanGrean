package com.greengreen.greengreen.entity;

import javax.persistence.*;

@Entity
public class Faq {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long faqId;

    @Column(name = "fag_title")
    private String faqTitle;

    @Column(name = "faq_content")
    private String fagContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;
}
