package com.greengreen.greengreen.controller;

import com.greengreen.greengreen.dto.request.*;
import com.greengreen.greengreen.dto.response.ProductDetailResDto;
import com.greengreen.greengreen.dto.response.ProductResDto;
import com.greengreen.greengreen.service.ProductService;
import com.greengreen.greengreen.service.PurchaseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/purchase")
public class PurchaseController {
    private final PurchaseService purchaseService;

    // 구매
    @PostMapping("/buy")
    public ResponseEntity<Void> purchaseBuy(@Valid @RequestBody PurchaseBuyReqDto purchaseBuyReqDto){
        purchaseService.buyPurchase(purchaseBuyReqDto);

        return ResponseEntity.ok().build();
    }
}