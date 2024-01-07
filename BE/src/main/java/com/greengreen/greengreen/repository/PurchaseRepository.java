package com.greengreen.greengreen.repository;

import com.greengreen.greengreen.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    @Query("select p from Purchase p where p.purchaseId = :purchaseId")
    Optional<Purchase> findByPurchaseId(Long purchaseId);

    @Query("select p from Purchase p where p.user.userId = :userId")
    List<Purchase> findAllByUserId(Long userId);

    @Query("select p from Purchase p where p.product.productId = :productId")
    List<Purchase> findAllByProductId(Long productId);
}
