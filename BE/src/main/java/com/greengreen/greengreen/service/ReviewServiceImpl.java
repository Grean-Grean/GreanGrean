package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.ReviewIdReqDto;
import com.greengreen.greengreen.dto.request.ReviewModifyReqDto;
import com.greengreen.greengreen.dto.request.ReviewRegistReqDto;
import com.greengreen.greengreen.entity.Product;
import com.greengreen.greengreen.entity.Purchase;
import com.greengreen.greengreen.entity.Review;
import com.greengreen.greengreen.entity.User;
import com.greengreen.greengreen.enums.PurchaseStatus;
import com.greengreen.greengreen.repository.ProductRepository;
import com.greengreen.greengreen.repository.PurchaseRepository;
import com.greengreen.greengreen.repository.ReviewRepository;
import com.greengreen.greengreen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    private final PurchaseRepository purchaseRepository;

    // 리뷰 등록
    @Override
    public void addReview(ReviewRegistReqDto reviewRegistReqDto) {
        Purchase purchase = purchaseRepository.findByPurchaseId(reviewRegistReqDto.getPurchaseId())
                .orElseThrow(()->new RuntimeException("구매 기록이 없습니다."));

        if(!purchase.getUser().getUserId().equals(reviewRegistReqDto.getUserId())){
            throw new RuntimeException("구매자만 리뷰를 작성할 수 있습니다.");
        }

        User user = userRepository.findByUserId(reviewRegistReqDto.getUserId())
                .orElseThrow(()->new RuntimeException("유효하지 않은 user입니다."));

        Product product = purchase.getProduct();

        if(purchase.getPurchaseStatus() == PurchaseStatus.COMPLETE){
            Review review = Review.builder()
                    .reviewContent(reviewRegistReqDto.getReviewContent())
                    .reviewCreateTime(LocalDateTime.now())
                    .reviewImg(reviewRegistReqDto.getReviewImg())
                    .user(user)
                    .product(product)
                    .build();

            reviewRepository.save(review);
        } else{
            throw new RuntimeException("구매 완료 후에만 리뷰를 작성할 수 있습니다.");
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
    public void deleteReview(Long reviewId, Long userId) {
        Review review = reviewRepository.findByReviewId(reviewId)
                .orElseThrow(()->new RuntimeException("ReviewId가 올바르지 않습니다."));

        if(review.getUser().getUserId().equals(userId)){
            reviewRepository.deleteByReviewId(reviewId)
                    .orElseThrow(()->new RuntimeException("ReviewId가 올바르지 않습니다."));
        } else{
            throw new RuntimeException("리뷰 작성자만 삭제할 수 있습니다");
        }
    }
}
