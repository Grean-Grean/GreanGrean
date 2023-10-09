package com.greengreen.greengreen.entity;

import com.greengreen.greengreen.dto.request.PurchaseIdReqDto;
import com.greengreen.greengreen.enums.PurchaseStatus;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(of = "purchaseId")
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long purchaseId;

    @Column(name = "purchase_name", nullable = false)
    private String purchaseName;

    @Column(name = "purchase_address", nullable = false)
    private String purchaseAddress;

    @Column(name = "purchase_number", columnDefinition = "Integer", nullable = false)
    private Integer purchaseNumber;

    @Column(name = "purchase_time", nullable = false)
    private LocalDateTime purchaseTime;

    @Column(name = "purchase_phone_number", nullable = false)
    private String purchasePhoneNumber;

    @Column(name = "purchase_state", nullable = false)
    private PurchaseStatus purchaseStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    public void acceptPurchaseStatus(){ this.purchaseStatus = PurchaseStatus.ACCEPT; }

    public void refusePurchaseStatus(){
        this.purchaseStatus = PurchaseStatus.REFUSE;
    }

    public void completePurchaseStatus(){
        this.purchaseStatus = PurchaseStatus.COMPLETE;
    }
}
