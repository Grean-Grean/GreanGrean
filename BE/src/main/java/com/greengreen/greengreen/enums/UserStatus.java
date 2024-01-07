package com.greengreen.greengreen.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserStatus {
    ABLE("가입"),
    UNABLE("탈퇴");

    private final String status;

}
