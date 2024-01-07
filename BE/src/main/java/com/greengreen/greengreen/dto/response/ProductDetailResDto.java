package com.greengreen.greengreen.dto.response;

import com.greengreen.greengreen.entity.Review;
import com.greengreen.greengreen.enums.ProductCategory;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailResDto {

    private Long sellerId;
    private Long productId;
    private String productName;
    private String productContent;
    private Integer productNumber;
    private Integer productPrice;
    private String productImg;
    private LocalDateTime productCreateTime;
    private LocalDateTime productModifyTime;
    private ProductCategory productCategory;
    private List<Review> review;
}
