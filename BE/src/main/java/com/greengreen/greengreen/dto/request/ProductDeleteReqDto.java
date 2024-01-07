package com.greengreen.greengreen.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDeleteReqDto {
    private Long productId;
    private Long userId;
}
