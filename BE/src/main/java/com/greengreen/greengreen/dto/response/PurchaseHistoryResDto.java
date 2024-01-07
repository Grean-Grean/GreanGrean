package com.greengreen.greengreen.dto.response;

import com.greengreen.greengreen.enums.PurchaseStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseHistoryResDto {
    private Long purchaseId;
    private String purchaseName;
    private String purchaseAddress;
    private Integer purchaseNumber;
    private Integer purchasePrice;
    private LocalDateTime purchaseTime;
    private String purchasePhoneNumber;
    private Long productId;
}
