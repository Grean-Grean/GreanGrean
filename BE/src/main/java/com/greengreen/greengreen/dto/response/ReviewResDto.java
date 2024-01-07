package com.greengreen.greengreen.dto.response;

import com.greengreen.greengreen.entity.Product;
import com.greengreen.greengreen.entity.User;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResDto {

    private Long reviewId;
    private String reviewContent;
    private LocalDateTime reviewCreateTime;
    private LocalDateTime reviewModifyTime;
    private String reviewImg;
}
