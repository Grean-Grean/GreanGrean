package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.ProductIdReqDto;
import com.greengreen.greengreen.dto.request.ReviewIdReqDto;
import com.greengreen.greengreen.dto.request.ReviewModifyReqDto;
import com.greengreen.greengreen.dto.request.ReviewRegistReqDto;
import com.greengreen.greengreen.dto.response.ReviewResDto;
import com.greengreen.greengreen.entity.Product;
import com.greengreen.greengreen.entity.Review;
import com.greengreen.greengreen.entity.User;
import com.greengreen.greengreen.repository.ProductRepository;
import com.greengreen.greengreen.repository.ReviewRepository;
import com.greengreen.greengreen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    // 리뷰 등록
    @Override
    public void addReview(ReviewRegistReqDto reviewRegistReqDto) {
        // 리뷰 등록 조건 - 1. 상품 구매자, 2. 구매 상태가 COMPLETE
        if(){
            User user = userRepository.findByUserId(reviewRegistReqDto.getUserId())
                    .orElseThrow(()->new RuntimeException("유효하지 않은 사용자입니다."));

            Product product = productRepository.findByProductId(reviewRegistReqDto.getProductId())
                    .orElseThrow(()->new RuntimeException("유효하지 않은 상품입니다."));

            Review review = Review.builder()
                    .reviewContent(reviewRegistReqDto.getReviewContent())
                    .reviewCreateTime(LocalDateTime.now())
                    .reviewImg(reviewRegistReqDto.getReviewImg())
                    .user(user)
                    .product(product)
                    .build();

            reviewRepository.save(review);
        } else{
            throw new RuntimeException("리뷰 작성자만 삭제할 수 있습니다");
        }
    }

    // 리뷰 조회
//    @Override
//    public List<ReviewResDto> listReview(ProductIdReqDto productIdReqDto) {
//        List<Review> reviewList = reviewRepository.findAllByProductId(productIdReqDto.getProductId());
//        List<ReviewResDto> reviewResDtos = new ArrayList<>();
//
//        for (Review review : reviewList){
//            ReviewResDto r = ReviewResDto.builder()
//                    .reviewId(review.getReviewId())
//                    .reviewContent(review.getReviewContent())
//                    .reviewCreateTime(review.getReviewCreateTime())
//                    .reviewModifyTime(review.getReviewModifyTime())
//                    .reviewImg(review.getReviewImg())
//                    .build();
//            reviewResDtos.add(r);
//        }
//
//        return reviewResDtos;
//    }

    // 리뷰 수정
    @Override
    public void modifyReview(ReviewModifyReqDto reviewModifyReqDto) {
        if(reviewModifyReqDto.getUserId().equals(reviewModifyReqDto.getUserId())){
            Review review = reviewRepository.findByReviewId(reviewModifyReqDto.getReviewId())
                    .orElseThrow(()->new RuntimeException("ReviewId가 올바르지 않습니다."));
            review.modifyReview(reviewModifyReqDto);
        } else{
            throw new RuntimeException("리뷰 작성자만 수정할 수 있습니다");
        }
    }

    // 리뷰 삭제
    @Override
    public void deleteReview(ReviewIdReqDto reviewIdReqDto) {
        Review review = reviewRepository.findByReviewId(reviewIdReqDto.getReviewId())
                .orElseThrow(()->new RuntimeException("ReviewId가 올바르지 않습니다."));

        if(review.getUser().getUserId().equals(reviewIdReqDto.getUserId())){
            reviewRepository.deleteByReviewId(reviewIdReqDto.getReviewId())
                    .orElseThrow(()->new RuntimeException("ReviewId가 올바르지 않습니다."));
        } else{
            throw new RuntimeException("리뷰 작성자만 삭제할 수 있습니다");
        }
    }
}
