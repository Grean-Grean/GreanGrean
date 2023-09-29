package com.greengreen.greengreen.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PurchaseStatus {
    ORDER("신청"),
    ACCEPT("수락"),
    COMPLETE("완료");

    private final String status;

}
