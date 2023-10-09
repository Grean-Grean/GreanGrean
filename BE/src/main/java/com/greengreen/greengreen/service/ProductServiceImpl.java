package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.*;
import com.greengreen.greengreen.dto.response.ProductDetailResDto;
import com.greengreen.greengreen.dto.response.ProductResDto;
import com.greengreen.greengreen.entity.Product;
import com.greengreen.greengreen.entity.User;
import com.greengreen.greengreen.enums.ProductStatus;
import com.greengreen.greengreen.repository.ProductRepository;
import com.greengreen.greengreen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    // 상품 등록
    @Override
    public void addProduct(ProductRegistReqDto productRegistReqDto) {
        User user = userRepository.findByUserId(productRegistReqDto.getUserId())
                .orElseThrow(()->new RuntimeException("유효하지 않은 user입니다."));

        ProductStatus productStatus = ProductStatus.valueOf(String.valueOf(productRegistReqDto.getProductCategory()));
        LocalDateTime localDateTime = LocalDateTime.now();

        Product product = Product.builder()
                .productName(productRegistReqDto.getProductName())
                .productContent(productRegistReqDto.getProductContent())
                .productNumber(productRegistReqDto.getProductNumber())
                .productPrice(productRegistReqDto.getProductPrice())
                .productImg(productRegistReqDto.getProductImg())
                .productCreateTime(localDateTime)
                .productCategory(productStatus)
                .user(user)
                .build();

        productRepository.save(product);
    }

    // 상품 전체 조회
    @Transactional(readOnly = true)
    @Override
    public List<ProductResDto> listProduct() {
        List<Product> productList = productRepository.findAll();
        List<ProductResDto> productResDtos = new ArrayList<>();

        for (Product product : productList) {
            ProductStatus productStatus = ProductStatus.valueOf(String.valueOf(product.getProductCategory()));

            ProductResDto p = ProductResDto.builder()
                    .productId(product.getProductId())
                    .productName(product.getProductName())
                    .productContent(product.getProductContent())
                    .productNumber(product.getProductNumber())
                    .productPrice(product.getProductPrice())
                    .productImg(product.getProductImg())
                    .productCreateTime(product.getProductCreateTime())
                    .productModifyTime(product.getProductModifyTime())
                    .productCategory(productStatus)
                    .build();
            productResDtos.add(p);
        }

        return productResDtos;
    }

    // 상품 상세 조회
    @Transactional(readOnly = true)
    @Override
    public ProductDetailResDto detailProduct(ProductIdReqDto productIdReqDto) {
        Product product = productRepository.findByProductId(productIdReqDto.getProductId())
                .orElseThrow(()->new RuntimeException("ProductId가 올바르지 않습니다."));

        ProductStatus productStatus = ProductStatus.valueOf(String.valueOf(product.getProductCategory()));

        ProductDetailResDto productDetailResDto = ProductDetailResDto.builder()
                .sellerId(product.getUser().getUserId())
                .productId(product.getProductId())
                .productName(product.getProductName())
                .productContent(product.getProductContent())
                .productNumber(product.getProductNumber())
                .productPrice(product.getProductPrice())
                .productImg(product.getProductImg())
                .productCreateTime(product.getProductCreateTime())
                .productModifyTime(product.getProductModifyTime())
                .productCategory(productStatus)
                .build();

        return productDetailResDto;
    }

    // 상품 검색어, 테마 조회
    @Transactional(readOnly = true)
    @Override
    public List<ProductResDto> searchQuery(ProductQueryReqDto productQueryReqDto) {
        List<Product> productList = productRepository.findAllByProductNameContainsAndProductCategory(
                productQueryReqDto.getQuery(), productQueryReqDto.getCategory());
        List<ProductResDto> productResDtos = new ArrayList<>();

        for (Product product : productList) {
            ProductStatus productStatus = ProductStatus.valueOf(String.valueOf(product.getProductCategory()));

            ProductResDto p = ProductResDto.builder()
                    .productId(product.getProductId())
                    .productName(product.getProductName())
                    .productContent(product.getProductContent())
                    .productNumber(product.getProductNumber())
                    .productPrice(product.getProductPrice())
                    .productImg(product.getProductImg())
                    .productCreateTime(product.getProductCreateTime())
                    .productModifyTime(product.getProductModifyTime())
                    .productCategory(productStatus)
                    .build();
            productResDtos.add(p);
        }

        return productResDtos;
    }

    // 상품 수정
    @Override
    public void modifyProduct(ProductModifyReqDto productModifyReqDto) {
        if(productModifyReqDto.getSellerId().equals(productModifyReqDto.getUserId())){
            Product product = productRepository.findByProductId(productModifyReqDto.getProductId())
                    .orElseThrow(()->new RuntimeException("ProductId가 올바르지 않습니다."));
            product.modifyProduct(productModifyReqDto);
        } else{
            throw new RuntimeException("상품 판매자만 수정할 수 있습니다");
        }
    }

    // 상품 삭제
    @Override
    public void deleteProduct(ProductIdReqDto productIdReqDto) {
        Product product = productRepository.findByProductId(productIdReqDto.getProductId())
                .orElseThrow(()->new RuntimeException("ProductId가 올바르지 않습니다."));

        if(product.getUser().getUserId().equals(productIdReqDto.getUserId())){
            productRepository.deleteByProductId(productIdReqDto.getProductId())
                    .orElseThrow(()->new RuntimeException("ProductId가 올바르지 않습니다."));
        } else{
            throw new RuntimeException("상품 판매자만 삭제할 수 있습니다");
        }
    }
}
