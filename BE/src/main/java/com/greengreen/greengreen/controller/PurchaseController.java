package com.greengreen.greengreen.controller;

import com.greengreen.greengreen.dto.request.*;
import com.greengreen.greengreen.service.PurchaseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/purchase")
@CrossOrigin("*")
public class PurchaseController {
    private final PurchaseService purchaseService;

    // 구매
    @PostMapping("/order")
    public ResponseEntity<Void> purchaseOrder(@Valid @RequestBody PurchaseOrderReqDto purchaseOrderReqDto){
        purchaseService.orderPurchase(purchaseOrderReqDto);

        return ResponseEntity.ok().build();
    }

    // 구매 수락
    @PostMapping("/accept")
    public ResponseEntity<Void> purchaseAccept(@RequestBody PurchaseIdReqDto purchaseIdReqDto){
        purchaseService.acceptPurchase(purchaseIdReqDto);

        return ResponseEntity.ok().build();
    }

    // 구매 거절
    @PostMapping("/refuse")
    public ResponseEntity<Void> purchaseRefuse(@RequestBody PurchaseIdReqDto purchaseIdReqDto){
        purchaseService.refusePurchase(purchaseIdReqDto);

        return ResponseEntity.ok().build();
    }

    // 구매 완료
    @PostMapping("/complete")
    public ResponseEntity<Void> purchaseComplete(@RequestBody PurchaseIdReqDto purchaseIdReqDto){
        purchaseService.completePurchase(purchaseIdReqDto);

        return ResponseEntity.ok().build();
    }


}