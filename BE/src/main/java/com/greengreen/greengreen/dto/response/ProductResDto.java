package com.greengreen.greengreen.dto.response;

import com.greengreen.greengreen.enums.ProductCategory;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResDto {

    private Long productId;
    private String productName;
    private String productContent;
    private Integer productNumber;
    private Integer productPrice;
    private String productImg;
    private LocalDateTime productCreateTime;
    private LocalDateTime productModifyTime;
    private ProductCategory productCategory;
}
