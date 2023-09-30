package com.greengreen.greengreen.dto.request;

import com.greengreen.greengreen.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ProductModifyReqDto {
    private Long userId;
    private Long sellerId;

    private Long productId;

    @NotBlank(message = "상품 이름을 입력해야 합니다.")
    private String productName;

    @NotBlank(message = "상품 설명을 입력해야 합니다.")
    private String productContent;

    @NotBlank(message = "상품 수량을 입력해야 합니다.")
    private Integer productNumber;

    @NotBlank(message = "상품 가격을 입력해야 합니다.")
    private Integer productPrice;

    @NotBlank(message = "상품 이미지을 입력해야 합니다.")
    private String productImg;

    @NotBlank(message = "상품 카테고리를 입력해야 합니다.")
    private ProductStatus productCategory;

}
