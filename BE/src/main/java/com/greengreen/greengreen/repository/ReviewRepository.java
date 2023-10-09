package com.greengreen.greengreen.repository;

import com.greengreen.greengreen.entity.Product;
import com.greengreen.greengreen.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByReviewId(Long reviewId);
    List<Review> findAllByProductId(Long productId);
    Optional<Review> deleteByReviewId(Long reviewId);
}
