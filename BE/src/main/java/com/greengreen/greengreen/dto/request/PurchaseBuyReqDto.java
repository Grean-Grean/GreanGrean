package com.greengreen.greengreen.dto.request;

import com.greengreen.greengreen.enums.PurchaseStatus;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseBuyReqDto {
    private String purchaseName;

    @NotBlank(message = "주소를 입력해야 합니다.")
    private String purchaseAddress;

    @NotBlank(message = "수량을 선택해야 합니다.")
    private Integer purchaseNumber;

    @NotBlank(message = "전화번호를 입력해야 합니다.")
    private String purchasePhoneNumber;

    private Long userId;
    private Long productId;
}
