package com.greengreen.greengreen.entity;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(name = "review_content", length = 255)
    private String reviewContent;

    @Column(name = "review_create_time")
    private LocalDateTime reviewCreateTime;

    @Column(name = "review_modify_time")
    private LocalDateTime reviewModifyTime;

    @Column(name = "review_img")
    private String reviewImg;
}
