package com.greengreen.greengreen.dto.request;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginReqDto {

    @NotBlank(message = "이메일을 입력해야 합니다.")
    @Email(message = "이메일 형식이 아닙니다.")
    private String userEmail;

    @NotBlank(message = "비밀번호를 입력해야 합니다.")
    private String userPassword;

}
