package com.greengreen.greengreen.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Builder
@AllArgsConstructor
public class UserRegistReqDto {

    @NotBlank(message = "아이디를 입력해야 합니다.")
    private String userId;

    @NotBlank(message = "이메일을 입력해야 합니다.")
    @Email(message = "이메일 형식이 아닙니다.")
    private String userEmail;

    @NotBlank(message = "비밀번호를 입력해야 합니다.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$", message = "비밀번호는 영문, 숫자, 특수기호 포함 8자리 이상이여야 합니다.")
    private String userPassword;

    @NotBlank(message = "이름을 입력해야 합니다.")
    private String userName;

    @NotBlank(message = "별명을 입력해야 합니다.")
    private String userNickName;
}
