package com.greengreen.greengreen.dto.request;

import com.greengreen.greengreen.entity.Product;
import com.greengreen.greengreen.entity.User;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRegistReqDto {
    @NotNull
    private Long userId;

    @NotNull
    private Long purchaseId;

    @NotBlank(message = "리뷰 내용을 입력해야 합니다.")
    private String reviewContent;

    @NotBlank(message = "리뷰 이미지를 입력해야 합니다.")
    private String reviewImg;
}
