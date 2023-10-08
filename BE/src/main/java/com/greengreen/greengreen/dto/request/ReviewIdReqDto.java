package com.greengreen.greengreen.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewIdReqDto {
    private Long userId;

    private Long reviewId;
}
