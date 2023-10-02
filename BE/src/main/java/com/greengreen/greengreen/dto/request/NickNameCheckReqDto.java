package com.greengreen.greengreen.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NickNameCheckReqDto {

    @NotBlank(message = "닉네임을 입력해야 합니다.")
    private String userNickName;

}
