package com.greengreen.greengreen.dto.request;

import com.greengreen.greengreen.enums.ProductCategory;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductCategoryReqDto {
    ProductCategory queryCategory;
}
