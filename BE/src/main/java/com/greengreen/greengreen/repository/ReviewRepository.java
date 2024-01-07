package com.greengreen.greengreen.repository;

import com.greengreen.greengreen.entity.Product;
import com.greengreen.greengreen.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByReviewId(Long reviewId);
    Optional<Review> deleteByReviewId(Long reviewId);

    @Query("select r from Review r where r.product.productId = :productId")
    List<Review> findAllByProductId(Long productId);

    @Query("select r from Review r where r.user.userId = :userId")
    List<Review> findAllByUserId(Long userId);
}
