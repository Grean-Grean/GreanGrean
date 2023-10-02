package com.greengreen.greengreen.dto.request;

import com.greengreen.greengreen.enums.ProductStatus;
import lombok.*;

import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductModifyReqDto {
    private Long userId;
    private Long sellerId;

    private Long productId;

    @NotBlank(message = "상품 이름을 입력해야 합니다.")
    private String productName;

    @NotBlank(message = "상품 설명을 입력해야 합니다.")
    private String productContent;

    @NotNull
    private Integer productNumber;

    @NotNull
    private Integer productPrice;

    @NotBlank(message = "상품 이미지을 입력해야 합니다.")
    private String productImg;

    private ProductStatus productCategory;

}
