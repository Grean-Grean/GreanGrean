package com.greengreen.greengreen.dto.response;

import com.greengreen.greengreen.entity.Product;
import com.greengreen.greengreen.enums.PurchaseStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseResDto {
    private Long purchaseId;
    private String purchaseName;
    private String purchaseAddress;
    private Integer purchaseNumber;
    private LocalDateTime purchaseTime;
    private String purchasePhoneNumber;
    private PurchaseStatus purchaseStatus;
    private Product product;
}
