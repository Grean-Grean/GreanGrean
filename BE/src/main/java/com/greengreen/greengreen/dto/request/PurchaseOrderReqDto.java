package com.greengreen.greengreen.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseOrderReqDto {
    private String purchaseName;

    @NotBlank(message = "주소를 입력해야 합니다.")
    private String purchaseAddress;

    @NotNull
    private Integer purchaseNumber;

    @NotBlank(message = "전화번호를 입력해야 합니다.")
    private String purchasePhoneNumber;

    private Long userId;
    private Long productId;
}
