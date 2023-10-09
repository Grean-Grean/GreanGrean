package com.greengreen.greengreen.repository;

import com.greengreen.greengreen.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    Optional<Purchase> findByPurchaseId(Long purchaseId);
}
