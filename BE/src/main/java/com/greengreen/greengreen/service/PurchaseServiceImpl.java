package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.PurchaseOrderReqDto;
import com.greengreen.greengreen.dto.request.PurchaseIdReqDto;
import com.greengreen.greengreen.entity.Product;
import com.greengreen.greengreen.entity.Purchase;
import com.greengreen.greengreen.entity.User;
import com.greengreen.greengreen.enums.PurchaseStatus;
import com.greengreen.greengreen.repository.ProductRepository;
import com.greengreen.greengreen.repository.PurchaseRepository;
import com.greengreen.greengreen.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PurchaseServiceImpl implements PurchaseService{
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PurchaseRepository purchaseRepository;

    // 구매
    @Override
    public void orderPurchase(PurchaseOrderReqDto purchaseOrderReqDto) {
        User user = userRepository.findByUserId(purchaseOrderReqDto.getUserId())
                .orElseThrow(()->new RuntimeException("유효하지 않은 user입니다."));

        Product product = productRepository.findByProductId(purchaseOrderReqDto.getProductId())
                .orElseThrow(()->new RuntimeException("유효하지 않은 product입니다."));

        Purchase purchase = Purchase.builder()
                .purchaseName(purchaseOrderReqDto.getPurchaseName())
                .purchaseAddress(purchaseOrderReqDto.getPurchaseAddress())
                .purchaseNumber(purchaseOrderReqDto.getPurchaseNumber())
                .purchasePhoneNumber(purchaseOrderReqDto.getPurchasePhoneNumber())
                .purchaseStatus(PurchaseStatus.ORDER)
                .purchaseTime(LocalDateTime.now())
                .user(user)
                .product(product)
                .build();

        purchaseRepository.save(purchase);
        
        // 구매한 수량만큼 빼기
        product.minusProductNumber(purchaseOrderReqDto.getPurchaseNumber());
    }

    // 구매 수락
    @Override
    public void acceptPurchase(PurchaseIdReqDto purchaseIdReqDto) {
        Purchase purchase = purchaseRepository.findByPurchaseId(purchaseIdReqDto.getPurchaseId())
                .orElseThrow(()->new RuntimeException("유효하지 않은 구매 내역입니다"));

        purchase.acceptPurchaseStatus();
    }

    // 구매 거절
    @Override
    public void refusePurchase(PurchaseIdReqDto purchaseIdReqDto) {
        Purchase purchase = purchaseRepository.findByPurchaseId(purchaseIdReqDto.getPurchaseId())
                .orElseThrow(()->new RuntimeException("유효하지 않은 구매 내역입니다"));

        purchase.refusePurchaseStatus();

        // 거절한 수량만큼 더하기
        Product product = productRepository.findByProductId(purchase.getProduct().getProductId())
                .orElseThrow(()->new RuntimeException("유효하지 않은 product입니다."));

        product.plusProductNumber(purchase.getPurchaseNumber());
    }

    // 구매 완료
    @Override
    public void completePurchase(PurchaseIdReqDto purchaseIdReqDto) {
        Purchase purchase = purchaseRepository.findByPurchaseId(purchaseIdReqDto.getPurchaseId())
                .orElseThrow(()->new RuntimeException("유효하지 않은 구매 내역입니다"));

        purchase.completePurchaseStatus();
    }
}
