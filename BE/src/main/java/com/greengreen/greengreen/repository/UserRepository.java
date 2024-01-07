package com.greengreen.greengreen.repository;

import com.fasterxml.jackson.databind.cfg.CoercionInputShape;
import com.greengreen.greengreen.entity.Purchase;
import com.greengreen.greengreen.entity.Review;
import com.greengreen.greengreen.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUserNickName(String userNickName);

    boolean existsByUserEmail(String userEmail);

    Optional<User> findByUserEmail(String userEmail);

    Optional<User> findByUserId(Long userId);
    Optional<User> findByUserNickName(String userNickName);
    Optional<User> deleteByUserId(Long userId);
    @Query("select pur from Purchase pur join Product pro on pur.product.productId = pro.productId where pro.user.userId = :userId")
    List<Purchase> findAllByPurchaseId(Long userId);
}
