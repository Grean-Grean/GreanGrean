package com.greengreen.greengreen.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
@AllArgsConstructor
public class NickNameCheckReqDto {

    @NotBlank(message = "닉네임을 입력해야 합니다.")
    private String userNickName;

}
