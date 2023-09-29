package com.greengreen.greengreen.entity;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(of = "productId")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "product_content", nullable = false)
    private String productContent;

    @Column(name = "product_number", columnDefinition = "Integer", nullable = false)
    private Integer productNumber;

    @Column(name = "product_price", columnDefinition = "Integer", nullable = false)
    private Integer productPrice;

    @Column(name = "product_img", nullable = false)
    private String  productImg;

    @Column(name = "product_create_time", nullable = false)
    private LocalDateTime productCreateTime;

    @Column(name = "product_category", nullable = false)
    private String productCategory;

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
