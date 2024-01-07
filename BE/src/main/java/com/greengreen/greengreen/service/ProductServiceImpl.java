package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.*;
import com.greengreen.greengreen.dto.response.ProductDetailResDto;
import com.greengreen.greengreen.dto.response.ProductResDto;
import com.greengreen.greengreen.entity.Product;
import com.greengreen.greengreen.entity.Purchase;
import com.greengreen.greengreen.entity.User;
import com.greengreen.greengreen.enums.ProductCategory;
import com.greengreen.greengreen.enums.ProductStatus;
import com.greengreen.greengreen.enums.PurchaseStatus;
import com.greengreen.greengreen.repository.ProductRepository;
import com.greengreen.greengreen.repository.PurchaseRepository;
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
    private final PurchaseRepository purchaseRepository;

    // 상품 등록
    @Override
    public void addProduct(ProductRegistReqDto productRegistReqDto) {
        User user = userRepository.findByUserId(productRegistReqDto.getUserId())
                .orElseThrow(()->new RuntimeException("유효하지 않은 user입니다."));

        ProductCategory productCategory = ProductCategory.valueOf(String.valueOf(productRegistReqDto.getProductCategory()));
        ProductStatus productStatus = ProductStatus.valueOf(String.valueOf(ProductStatus.SALE));
        LocalDateTime localDateTime = LocalDateTime.now();

        Product product = Product.builder()
                .productName(productRegistReqDto.getProductName())
                .productContent(productRegistReqDto.getProductContent())
                .productNumber(productRegistReqDto.getProductNumber())
                .productPrice(productRegistReqDto.getProductPrice())
                .productImg(productRegistReqDto.getProductImg())
                .productCreateTime(localDateTime)
                .productCategory(productCategory)
                .productStatus(productStatus)
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
            ProductCategory productCategory = ProductCategory.valueOf(String.valueOf(product.getProductCategory()));
            if(product.getProductStatus() == ProductStatus.SALE) {
                ProductResDto p = ProductResDto.builder()
                        .productId(product.getProductId())
                        .productName(product.getProductName())
                        .productContent(product.getProductContent())
                        .productNumber(product.getProductNumber())
                        .productPrice(product.getProductPrice())
                        .productImg(product.getProductImg())
                        .productCreateTime(product.getProductCreateTime())
                        .productModifyTime(product.getProductModifyTime())
                        .productCategory(productCategory)
                        .build();
                productResDtos.add(p);
            }
        }

        return productResDtos;
    }

    // 상품 상세 조회
    @Transactional(readOnly = true)
    @Override
    public ProductDetailResDto detailProduct(Long productId) {
        Product product = productRepository.findByProductId(productId)
                .orElseThrow(()->new RuntimeException("ProductId가 올바르지 않습니다."));

        if(product.getProductStatus() == ProductStatus.DISCON){
            throw new RuntimeException("판매종료된 상품입니다.");
        }

        ProductCategory productCategory = ProductCategory.valueOf(String.valueOf(product.getProductCategory()));

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
                .productCategory(productCategory)
                .build();

        return productDetailResDto;
    }

    // 상품 검색어, 테마 조회
//    @Transactional(readOnly = true)
//    @Override
//    public List<ProductResDto> searchQuery(String query, String category) {
//        ProductStatus productSt =  ProductStatus.valueOf(category);
//        List<Product> productList = productRepository.findAllByProductNameContainsAndProductCategory(
//                query, productSt);
//        List<ProductResDto> productResDtos = new ArrayList<>();
//
//        for (Product product : productList) {
//            ProductStatus productStatus = ProductStatus.valueOf(String.valueOf(product.getProductCategory()));
//
//            ProductResDto p = ProductResDto.builder()
//                    .productId(product.getProductId())
//                    .productName(product.getProductName())
//                    .productContent(product.getProductContent())
//                    .productNumber(product.getProductNumber())
//                    .productPrice(product.getProductPrice())
//                    .productImg(product.getProductImg())
//                    .productCreateTime(product.getProductCreateTime())
//                    .productModifyTime(product.getProductModifyTime())
//                    .productCategory(productStatus)
//                    .build();
//            productResDtos.add(p);
//        }
//
//        return productResDtos;
//    }

    @Transactional(readOnly = true)
    @Override
    public List<ProductResDto> searchQuery(String query, String category) {
        // category 값을 열거형 상수와 일치하도록 수정
        ProductCategory productCategory = ProductCategory.valueOf(category); // 이 부분 수정

        List<Product> productList = productRepository.findAllByProductNameContainsAndProductCategory(
                query, productCategory);

        List<ProductResDto> productResDtos = new ArrayList<>();

        for (Product product : productList) {
            if(product.getProductStatus() == ProductStatus.SALE) {
                ProductResDto p = ProductResDto.builder()
                        .productId(product.getProductId())
                        .productName(product.getProductName())
                        .productContent(product.getProductContent())
                        .productNumber(product.getProductNumber())
                        .productPrice(product.getProductPrice())
                        .productImg(product.getProductImg())
                        .productCreateTime(product.getProductCreateTime())
                        .productModifyTime(product.getProductModifyTime())
                        .productCategory(productCategory) // 열거형 상수로 설정
                        .build();
                productResDtos.add(p);
            }
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
    public void deleteProduct(ProductDeleteReqDto productDeleteReqDto) {
        Product product = productRepository.findByProductId(productDeleteReqDto.getProductId())
                .orElseThrow(()->new RuntimeException("ProductId가 올바르지 않습니다."));

        if(product.getUser().getUserId().equals(productDeleteReqDto.getUserId())){
            // productStatus 판매중단으로 변경
            product.deleteProduct(product.getProductId());

            // purchaseStatus 거절로 변경
            List<Purchase> purchaseList = purchaseRepository.findAllByProductId(product.getProductId());
            for(Purchase purchase : purchaseList){
                if(purchase.getPurchaseStatus() == PurchaseStatus.ORDER || purchase.getPurchaseStatus() == PurchaseStatus.ACCEPT)
                    purchase.refusePurchaseStatus();
            }

//            productRepository.deleteByProductId(product.getProductId())
//                    .orElseThrow(()->new RuntimeException("ProductId가 올바르지 않습니다."));
        }else{
            throw new RuntimeException("상품 판매자만 삭제할 수 있습니다");
        }
    }

    // 키워드 조회
    @Transactional(readOnly = true)
    @Override
    public List<ProductResDto> queryProduct(String query) {
        List<Product> productList = productRepository.findAllByProductNameContains(query);
        List<ProductResDto> productResDtos = new ArrayList<>();

        for (Product product : productList) {
            ProductCategory productCategory = ProductCategory.valueOf(String.valueOf(product.getProductCategory()));

            ProductResDto p = ProductResDto.builder()
                    .productId(product.getProductId())
                    .productName(product.getProductName())
                    .productContent(product.getProductContent())
                    .productNumber(product.getProductNumber())
                    .productPrice(product.getProductPrice())
                    .productImg(product.getProductImg())
                    .productCreateTime(product.getProductCreateTime())
                    .productModifyTime(product.getProductModifyTime())
                    .productCategory(productCategory)
                    .build();
            productResDtos.add(p);
        }

        return productResDtos;
    }
}
