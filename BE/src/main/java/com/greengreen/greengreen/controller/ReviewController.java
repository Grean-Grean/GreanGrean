package com.greengreen.greengreen.controller;

import com.greengreen.greengreen.dto.request.ProductIdReqDto;
import com.greengreen.greengreen.dto.request.ReviewIdReqDto;
import com.greengreen.greengreen.dto.request.ReviewModifyReqDto;
import com.greengreen.greengreen.dto.request.ReviewRegistReqDto;
import com.greengreen.greengreen.dto.response.ReviewResDto;
import com.greengreen.greengreen.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.PreUpdate;
import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
@CrossOrigin("*")
public class ReviewController {
    private final ReviewService reviewService;

    // 리뷰 등록
    @PostMapping("/add")
    public ResponseEntity<Void> reviewAdd(@Valid @RequestBody ReviewRegistReqDto reviewRegistReqDto){
        reviewService.addReview(reviewRegistReqDto);

        return ResponseEntity.ok().build();
    }

    // 리뷰 전체 조회
    @GetMapping("/list")
    public ResponseEntity<List<ReviewResDto>> reviewList(@Valid @RequestBody ProductIdReqDto productIdReqDto){
        List<ReviewResDto> reviewResDtos = reviewService.listReview(productIdReqDto);

        return ResponseEntity.ok()
                .body(reviewResDtos);
    }

    // 리뷰 수정
    @PutMapping("/modify/{reviewId}")
    public ResponseEntity<Void> reviewModify(@Valid @PathVariable ReviewModifyReqDto reviewModifyReqDto){
        reviewService.modifyReview(reviewModifyReqDto);

        return ResponseEntity.ok().build();
    }

    // 리뷰 삭제
    @DeleteMapping("/delete/{reviewId}")
    public ResponseEntity<Void> reviewDelete(@PathVariable ReviewIdReqDto reviewIdReqDto){
        reviewService.deleteReview(reviewIdReqDto);

        return ResponseEntity.ok().build();
    }
}
