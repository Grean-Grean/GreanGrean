package com.greengreen.greengreen.dto.request;

import com.greengreen.greengreen.enums.ProductStatus;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductQueryReqDto {
    String query;
    ProductStatus category;
}
