package com.greengreen.greengreen.dto.request;

import com.greengreen.greengreen.enums.ProductCategory;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductQueryReqDto {
    private String query;
    private ProductCategory category;
}
