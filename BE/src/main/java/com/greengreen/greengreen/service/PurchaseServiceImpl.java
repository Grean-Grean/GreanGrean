package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.PurchaseBuyReqDto;
import com.greengreen.greengreen.entity.Product;
import com.greengreen.greengreen.entity.Purchase;
import com.greengreen.greengreen.entity.User;
import com.greengreen.greengreen.repository.ProductRepository;
import com.greengreen.greengreen.repository.PurchaseRepository;
import com.greengreen.greengreen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PurchaseServiceImpl implements PurchaseService{
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    // 구매
    @Override
    public void buyPurchase(PurchaseBuyReqDto purchaseBuyReqDto) {
        User user = userRepository.findByUserId(purchaseBuyReqDto.getUserId())
                .orElseThrow(()->new RuntimeException("유효하지 않은 user입니다."));

        Product product = productRepository.findByProductId(purchaseBuyReqDto.getProductId())
                .orElseThrow(()->new RuntimeException("유효하지 않은 product입니다."));

        Purchase purchase = Purchase.builder()
                .purchaseName(purchaseBuyReqDto.getPurchaseName())
                .purchaseAddress(purchaseBuyReqDto.getPurchaseAddress())
                .purchaseNumber(purchaseBuyReqDto.getPurchaseNumber())
                .purchasePhoneNumber(purchaseBuyReqDto.getPurchasePhoneNumber())
                .user(user)
                .product(product)
                .build();
    }
}
