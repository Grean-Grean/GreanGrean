package com.greengreen.greengreen.entity;

import com.greengreen.greengreen.dto.request.ReviewModifyReqDto;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(of = "reviewId")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(name = "review_content", nullable = false)
    private String reviewContent;

    @Column(name = "review_create_time", nullable = false)
    private LocalDateTime reviewCreateTime;

    @Column(name = "review_modify_time")
    private LocalDateTime reviewModifyTime;

    @Column(name = "review_img", nullable = false)
    private String reviewImg;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    public void modifyReview(ReviewModifyReqDto reviewModifyReqDto){
        this.reviewContent = reviewModifyReqDto.getReviewContent();
        this.reviewModifyTime = LocalDateTime.now();
        this.reviewImg = reviewModifyReqDto.getReviewImg();
    }

}
