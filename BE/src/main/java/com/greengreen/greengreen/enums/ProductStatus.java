package com.greengreen.greengreen.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ProductStatus {
    SALE("판매중"),
    SOLDOUT("품절"),
    DISCON("판매중단");

    private final String status;

}