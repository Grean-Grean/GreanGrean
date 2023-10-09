package com.greengreen.greengreen.entity;

import com.greengreen.greengreen.dto.request.ProductModifyReqDto;
import com.greengreen.greengreen.enums.ProductStatus;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
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
    private String productImg;

    @Column(name = "product_create_time", nullable = false)
    private LocalDateTime productCreateTime;

    @Column(name = "product_modify_time")
    private LocalDateTime productModifyTime;

    @Column(name = "product_category", nullable = false)
    private ProductStatus productCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy="product", cascade=CascadeType.ALL)
    private List<Review> reviews;

    @OneToMany(mappedBy="product", cascade=CascadeType.ALL)
    private List<Purchase> purchases;

    public void modifyProduct(ProductModifyReqDto productModifyReqDto){
        this.productName = productModifyReqDto.getProductName();
        this.productContent = productModifyReqDto.getProductContent();
        this.productNumber = productModifyReqDto.getProductNumber();
        this.productPrice = productModifyReqDto.getProductPrice();
        this.productImg = productModifyReqDto.getProductImg();
        this.productModifyTime = LocalDateTime.now();
        this.productCategory = ProductStatus.valueOf(String.valueOf(productModifyReqDto.getProductCategory()));
    }

    public void minusProductNumber(Integer purchaseNumber){
        this.productNumber -= purchaseNumber;
    }

    public void plusProductNumber(Integer purchaseNumber){
        this.productNumber += purchaseNumber;
    }
}
