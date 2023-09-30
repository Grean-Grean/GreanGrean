package com.greengreen.greengreen.dto.request;

import com.greengreen.greengreen.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProductCategoryReqDto {
    ProductStatus queryCategory;
}
