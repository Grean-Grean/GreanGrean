package com.greengreen.greengreen.repository;

import com.greengreen.greengreen.entity.Product;
import com.greengreen.greengreen.enums.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByProductId(Long productId);
    List<Product> findAllByProductNameContainsAndProductCategory(String query, ProductCategory category);
    Optional<Product> deleteByProductId(Long productId);

    List<Product> findAllByProductNameContains(String query);

    @Query("select p from Product p where p.user.userId = :userId")
    List<Product> findAllByUserId(Long userId);
}
