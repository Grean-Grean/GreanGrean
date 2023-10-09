package com.greengreen.greengreen.repository;

import com.greengreen.greengreen.entity.Product;
import com.greengreen.greengreen.enums.ProductStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByProductId(Long productId);
    List<Product> findAllByProductNameContainsAndProductCategory(String query, ProductStatus category);
    Optional<Product> deleteByProductId(Long productId);

    List<Product> findAllByProductNameContains(String query);
}
