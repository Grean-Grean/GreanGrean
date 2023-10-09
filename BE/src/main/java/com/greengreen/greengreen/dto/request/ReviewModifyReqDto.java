package com.greengreen.greengreen.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewModifyReqDto {
    private Long userId;

    private Long reviewId;

    @NotBlank(message = "리뷰 내용을 입력해야 합니다.")
    private String reviewContent;

    @NotBlank(message = "리뷰 이미지를 입력해야 합니다.")
    private String reviewImg;
}
