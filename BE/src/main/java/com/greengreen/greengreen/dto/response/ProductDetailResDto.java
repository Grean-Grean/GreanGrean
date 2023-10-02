package com.greengreen.greengreen.dto.response;

import com.greengreen.greengreen.entity.Review;
import com.greengreen.greengreen.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Setter;

import java.util.List;

@Setter
@Builder
@AllArgsConstructor
public class ProductDetailResDto {

    private Long productId;
    private String productName;
    private String productContent;
    private Integer productNumber;
    private Integer productPrice;
    private String productImg;
    private ProductStatus productCategory;
    private List<Review> review;
}
