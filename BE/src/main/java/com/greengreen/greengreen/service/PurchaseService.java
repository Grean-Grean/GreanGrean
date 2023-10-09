package com.greengreen.greengreen.service;

import com.greengreen.greengreen.dto.request.PurchaseOrderReqDto;
import com.greengreen.greengreen.dto.request.PurchaseIdReqDto;

public interface PurchaseService {
    void orderPurchase(PurchaseOrderReqDto purchaseOrderReqDto);
    void acceptPurchase(PurchaseIdReqDto purchaseIdReqDto);
    void refusePurchase(PurchaseIdReqDto purchaseIdReqDto);
    void completePurchase(PurchaseIdReqDto purchaseIdReqDto);
}
