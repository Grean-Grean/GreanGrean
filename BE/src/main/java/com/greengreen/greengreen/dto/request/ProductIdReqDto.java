package com.greengreen.greengreen.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductIdReqDto {
    private Long userId;

    private Long productId;
}
